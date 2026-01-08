import React, { useState, useRef } from 'react';

export default function UploadImagesModal({id_pro ,  isOpen, onClose, onUploadComplete }) {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Gérer la sélection de fichiers
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    handleFiles(files);
  };

  // Gérer le drag and drop
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = Array.from(event.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    handleFiles(imageFiles);
  };

  // Traiter les fichiers images
  const handleFiles = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      alert('Veuillez sélectionner uniquement des fichiers image');
      return;
    }

    const newImages = imageFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2), // Taille en MB
      url: URL.createObjectURL(file),
      status: 'pending'
    }));

    setImages(prev => [...prev, ...newImages]);
  };

  // Supprimer une image
  const handleRemoveImage = (id) => {
    const imageToRemove = images.find(img => img.id === id);
    if (imageToRemove && imageToRemove.url) {
      URL.revokeObjectURL(imageToRemove.url);
    }
    
    setImages(prev => prev.filter(img => img.id !== id));
  };

  // Tout supprimer
  const handleClearAll = () => {
    images.forEach(img => {
      if (img.url) {
        URL.revokeObjectURL(img.url);
      }
    });
    setImages([]);
  };

  // Uploader les images
  const handleUpload = async () => {
    if (images.length === 0) {
      alert('Veuillez d\'abord sélectionner des images');
      return;
    }

    setIsUploading(true);
    
    // Simuler le processus d'upload
    const uploadPromises = images.map(async (image, index) => {
      await new Promise(resolve => setTimeout(resolve, 300 + index * 100));
      
      return {
        ...image,
        status: 'success',
        uploadedAt: new Date().toISOString()
      };
    });

    try {
      const uploadedImages = await Promise.all(uploadPromises);
      setImages(uploadedImages);
      
      // Préparer les données pour l'envoi
      const imageData = uploadedImages.map(img => ({
        name: img.name,
        size: img.size,
        type: img.file.type,
        file: img.file // Pour FormData
      }));
      
      // Appeler le callback si fourni
      if (onUploadComplete) {
        onUploadComplete(imageData);
      }
      
      // Fermer la modal après un délai
      setTimeout(() => {
        handleResetAndClose();
      }, 1000);
      
    } catch (error) {
      alert('❌ Une erreur est survenue lors du téléchargement');
      setIsUploading(false);
    }
  };

  // Réinitialiser et fermer
  const handleResetAndClose = () => {
    handleClearAll();
    onClose();
    setIsUploading(false);
  };

  // Ouvrir le sélecteur de fichiers
  const handleSelectClick = () => {
    fileInputRef.current.click();
  };

  // Si la modal n'est pas ouverte
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleResetAndClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* En-tête */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Télécharger des Images
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Ajoutez plusieurs images à la fois
                </p>
              </div>
              
              <button
                onClick={handleResetAndClose}
                className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Contenu */}
          <div className="px-6 py-4">
            {/* Zone de drop */}
            <div 
              className={`p-8 border-2 border-dashed rounded-lg transition-all duration-300 ${
                isDragging 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleSelectClick}
              style={{ cursor: 'pointer' }}
            >
              <div className="text-center">
                <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center bg-blue-100 rounded-full">
                  <svg 
                    className="w-8 h-8 text-blue-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                    />
                  </svg>
                </div>
                
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  {isDragging ? 'Déposez vos images ici' : 'Glissez-déposez vos images ici'}
                </h3>
                
                <p className="text-gray-500 mb-4">
                  ou <span className="text-blue-600 font-medium">cliquez pour sélectionner</span>
                </p>
                
                <p className="text-sm text-gray-400">
                  Formats supportés: JPG, PNG, GIF, WEBP • Max 10MB par image
                </p>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                multiple
                accept="image/*"
              />
            </div>

            {/* Liste des images */}
            {images.length > 0 && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="font-medium text-gray-700">
                      {images.length} image(s) sélectionnée(s)
                    </span>
                    <span className="text-gray-500 text-sm ml-2">
                      • {(images.reduce((acc, img) => acc + parseFloat(img.size), 0)).toFixed(2)} MB
                    </span>
                  </div>
                  
                  <button
                    onClick={handleClearAll}
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    Tout supprimer
                  </button>
                </div>

                {/* Grid d'images */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto p-2">
                  {images.map((image) => (
                    <div 
                      key={image.id} 
                      className="relative group border border-gray-200 rounded-md overflow-hidden hover:shadow-md transition-all"
                    >
                      {/* Image */}
                      <div className="aspect-square bg-gray-100">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Overlay de suppression */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage(image.id);
                          }}
                          className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors transform scale-0 group-hover:scale-100"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Nom de fichier */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                        <p className="text-xs text-white truncate">{image.name}</p>
                      </div>
                      
                      {/* Badge de statut */}
                      {image.status === 'success' && (
                        <div className="absolute top-1 right-1">
                          <span className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                            ✓
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instructions */}
            {images.length === 0 && (
              <div className="mt-6 text-center text-gray-500">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-700">Sélectionnez</h4>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-700">Vérifiez</h4>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-blue-600 font-bold text-sm">3</span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-700">Envoyez</h4>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pied de modal */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {images.length > 0 ? `${images.length} image(s) prête(s)` : 'Aucune image sélectionnée'}
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-gray-700 font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isUploading}
                >
                  Annuler
                </button>
                
                <button
                  onClick={handleUpload}
                  disabled={isUploading || images.length === 0}
                  className={`px-4 py-2 font-medium rounded-lg transition-all ${
                    isUploading || images.length === 0
                      ? 'bg-blue-300 text-white cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isUploading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi...
                    </div>
                  ) : (
                    `Télécharger (${images.length})`
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}