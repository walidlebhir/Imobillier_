from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt_sha256", "bcrypt", "pbkdf2_sha256"], deprecated="auto")

MAX_BCRYPT_LEN = 72  # bcrypt limite

# ---------------- HASH ----------------
def hash_password(password: str) -> str:
    if not isinstance(password, str):
        raise ValueError("Password must be a string")
    # Tronquer le mot de passe à 72 octets en UTF-8 (bcrypt limite)
    truncated = _truncate_password(password)
    try:
        return pwd_context.hash(truncated)
    except ValueError:
        # Fallback to a scheme without the 72-byte bcrypt limit
        return pwd_context.hash(truncated, scheme="pbkdf2_sha256")

# ---------------- VERIFY ----------------
def verify_password(password: str, hashed_password: str) -> bool:
    if not isinstance(password, str):
        return False
    # Tronquer également à 72 octets UTF-8 pour la vérification
    truncated = _truncate_password(password)
    try:
        return pwd_context.verify(truncated, hashed_password)
    except ValueError:
        # bcrypt backend may raise ValueError for long secrets during
        # backend detection or hashing. In that case, fail safely.
        return False


def _truncate_password(password: str) -> str:
    """Return a string truncated to at most MAX_BCRYPT_LEN bytes when encoded as UTF-8.

    We encode to UTF-8, slice the first MAX_BCRYPT_LEN bytes, then decode with
    'ignore' to avoid partial multibyte sequences. This guarantees the
    resulting string is <=72 bytes when passed to bcrypt.
    """
    if not isinstance(password, str):
        raise ValueError("Password must be a string")
    b = password.encode("utf-8")[:MAX_BCRYPT_LEN]
    return b.decode("utf-8", "ignore")

# ---------------- AUTH ----------------
def authenticate(db, email: str, password: str):
    from src.Models.User import User
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    if not verify_password(password, user.password):
        return None
    return user
