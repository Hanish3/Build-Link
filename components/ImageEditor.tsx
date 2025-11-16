import React, { useState, useCallback } from 'react';
import { editImageWithAI } from '../services/geminiService';
import { ArrowPathIcon, PhotoIcon, WandSparklesIcon } from './icons';

const ImageEditor: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);


  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setOriginalFile(file);
      setOriginalImage(URL.createObjectURL(file));
      setEditedImage(null);
      setError(null);
    }
  };

  const processImage = useCallback(async () => {
    if (!originalFile || !prompt) {
      setError('Please upload an image and provide an editing prompt.');
      return;
    }
    setIsLoading(true);
    setEditedImage(null);
    setError(null);
    try {
      const base64Image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(originalFile);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
      });
      const generatedImage = await editImageWithAI(prompt, { data: base64Image, mimeType: originalFile.type });
      setEditedImage(`data:image/png;base64,${generatedImage}`);
    } catch (err) {
      setError('Failed to edit image. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, originalFile]);
  
  const examplePrompts = ["Add a retro filter", "Make the sky look like a sunset", "Remove the person in the background", "Turn this into a blueprint sketch"];

  return (
    <div className="bg-brand-blue-dark/50 backdrop-blur-lg border border-brand-blue-light rounded-xl shadow-2xl p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <WandSparklesIcon className="w-6 h-6 text-brand-gold" />
        <h3 className="text-xl font-jura text-white">AI Image Editor</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
        <div className="flex flex-col gap-4">
          <div className="relative border-2 border-dashed border-brand-blue-light rounded-lg h-64 flex items-center justify-center text-slate-400 hover:border-brand-gold transition-colors bg-brand-blue-dark/40">
            {originalImage ? (
              <img src={originalImage} alt="Original" className="max-h-full max-w-full object-contain rounded-lg" />
            ) : (
              <div className="text-center">
                <PhotoIcon className="w-12 h-12 mx-auto" />
                <p>Upload an image to start</p>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          </div>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map(p => (
              <button key={p} onClick={() => setPrompt(p)} className="text-xs bg-brand-blue hover:bg-brand-blue-light text-slate-200 px-2 py-1 rounded-md transition-colors">{p}</button>
            ))}
          </div>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'Add a retro filter'"
            className="w-full bg-brand-blue-dark/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-white"
          />
          <button
            onClick={processImage}
            disabled={isLoading || !originalImage || !prompt}
            className="w-full bg-brand-gold text-brand-blue-dark font-bold py-3 rounded-lg hover:bg-brand-gold-light disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/20 flex items-center justify-center gap-2"
          >
            {isLoading ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : <WandSparklesIcon className="w-5 h-5" />}
            {isLoading ? 'Editing...' : 'Apply AI Edit'}
          </button>
        </div>
        <div className="relative border-2 border-dashed border-brand-blue-light rounded-lg h-full flex items-center justify-center text-slate-400 bg-brand-blue-dark/40">
          {isLoading && (
            <div className="flex flex-col items-center gap-2 text-brand-gold">
              <ArrowPathIcon className="w-12 h-12 animate-spin" />
              <p>Archigen AI is thinking...</p>
            </div>
          )}
          {editedImage && !isLoading && (
            <img src={editedImage} alt="Edited" className="max-h-full max-w-full object-contain rounded-lg" />
          )}
          {!editedImage && !isLoading && (
            <div className="text-center">
              <WandSparklesIcon className="w-12 h-12 mx-auto" />
              <p>Your edited image will appear here</p>
            </div>
          )}
           {error && !isLoading && <p className="absolute bottom-4 text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;