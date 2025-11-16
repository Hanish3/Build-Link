import React, { useState, useRef, useEffect, useCallback } from 'react';
import { User } from '../../types';
import { IdCardIcon, PhotoIcon, CheckBadgeIcon } from '../../components/icons';

interface ArchitectVerificationProps {
  user: User;
  onSubmit: () => void;
}

const ArchitectVerification: React.FC<ArchitectVerificationProps> = ({ user, onSubmit }) => {
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [licensePreview, setLicensePreview] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(10);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);

  const handleFileSelect = (file: File | null) => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        if (licensePreview) {
            URL.revokeObjectURL(licensePreview);
        }
        setLicenseFile(file);
        setLicensePreview(URL.createObjectURL(file));
        setError(null);
    } else if (file) {
        setError("Invalid file type. Please upload a JPEG or PNG image.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDraggingOver(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDraggingOver(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleFileSelect(e.dataTransfer.files[0]);
      }
  };

  const startCamera = async () => {
    setError(null);
    setRecordedVideoUrl(null); // Reset previous recording
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      setVideoStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera permission denied:", err);
      setError("Camera access is required for video verification. Please enable it in your browser settings.");
    }
  };

  const stopCamera = useCallback(() => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
    }
  }, [videoStream]);

  const startRecording = () => {
    if (videoStream) {
      setRecordedVideoUrl(null);
      setIsRecording(true);
      const videoChunks: Blob[] = [];
      mediaRecorderRef.current = new MediaRecorder(videoStream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        videoChunks.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const videoBlob = new Blob(videoChunks, { type: 'video/webm' });
        setRecordedVideoUrl(URL.createObjectURL(videoBlob));
        stopCamera();
      };
      mediaRecorderRef.current.start();

      setCountdown(10);
      countdownIntervalRef.current = window.setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);

      setTimeout(() => {
        stopRecording();
      }, 10000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        if(countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    }
  };
  
  const handleSubmit = () => {
      if (!licenseFile || !recordedVideoUrl) {
          setError("Please complete both steps before submitting.");
          return;
      }
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
          onSubmit();
          setIsSubmitting(false);
      }, 1500);
  }

  // Cleanup effect
  useEffect(() => {
    return () => {
      stopCamera();
      if(countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [stopCamera]);
  
  if (user.verificationStatus === 'pending') {
      return (
          <div className="bg-brand-blue-dark/50 backdrop-blur-lg border border-brand-blue-light rounded-xl shadow-2xl p-6 h-full flex flex-col items-center justify-center text-center">
              <CheckBadgeIcon className="w-20 h-20 text-slate-200 mb-4"/>
              <h1 className="text-3xl font-jura font-bold text-white">Verification Submitted</h1>
              <p className="text-slate-300 mt-2 max-w-md">Your documents are under review. We'll notify you via email once the process is complete, typically within 2-3 business days.</p>
          </div>
      )
  }
  
   if (user.verificationStatus === 'verified') {
      return (
          <div className="bg-brand-blue-dark/50 backdrop-blur-lg border border-brand-blue-light rounded-xl shadow-2xl p-6 h-full flex flex-col items-center justify-center text-center">
              <CheckBadgeIcon className="w-20 h-20 text-brand-gold mb-4"/>
              <h1 className="text-3xl font-jura font-bold text-white">You are Verified!</h1>
              <p className="text-slate-300 mt-2 max-w-md">Congratulations! Your account is fully verified and you are now visible to clients on the platform.</p>
          </div>
      )
  }


  return (
    <div className="bg-brand-blue-dark/50 backdrop-blur-lg border border-brand-blue-light rounded-xl shadow-2xl p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <IdCardIcon className="w-8 h-8 text-brand-gold" />
        <h1 className="text-3xl font-jura font-bold text-white">Architect Verification Center</h1>
      </div>
      <p className="text-slate-400 mb-8 max-w-3xl">To ensure the quality and safety of our platform, all architects must complete a two-step verification process. Please submit a clear image of your professional license and a short video of yourself.</p>
      
      {error && <p className="text-red-400 bg-red-500/10 border border-red-500/30 p-3 rounded-lg text-center mb-6">{error}</p>}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Step 1: License Upload */}
        <div className="bg-brand-blue-dark/40 p-6 rounded-lg border border-brand-blue-light/50">
            <h2 className="text-2xl font-jura text-brand-gold mb-4">Step 1: Upload License</h2>
            <div 
              className={`relative border-2 border-dashed rounded-lg h-60 flex items-center justify-center text-slate-400 transition-colors ${isDraggingOver ? 'border-brand-gold bg-brand-gold/10' : 'border-brand-blue-light hover:border-brand-gold'}`}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
                {licensePreview ? (
                    <img src={licensePreview} alt="License Preview" className="max-h-full max-w-full object-contain p-2"/>
                ) : (
                    <div className="text-center pointer-events-none">
                        <PhotoIcon className="w-12 h-12 mx-auto"/>
                        <p>Click or drag to upload</p>
                        <p className="text-xs mt-1">(JPEG or PNG)</p>
                    </div>
                )}
                <input type="file" accept="image/jpeg, image/png" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
            </div>
        </div>
        
        {/* Step 2: Video Verification */}
        <div className="bg-brand-blue-dark/40 p-6 rounded-lg border border-brand-blue-light/50">
            <h2 className="text-2xl font-jura text-brand-gold mb-4">Step 2: Video Verification</h2>
            <div className="bg-black rounded-lg h-60 w-full overflow-hidden flex items-center justify-center">
                <video 
                  ref={videoRef} 
                  autoPlay={!recordedVideoUrl}
                  playsInline 
                  muted={!recordedVideoUrl}
                  controls={!!recordedVideoUrl}
                  src={recordedVideoUrl || undefined}
                  className={`w-full h-full object-cover ${!videoStream && !recordedVideoUrl ? 'hidden' : ''}`}
                />
                
                {!videoStream && !recordedVideoUrl && (
                    <div className="text-center text-slate-400">
                        <p className="mb-4">Camera feed will appear here</p>
                         <button onClick={startCamera} className="bg-brand-blue hover:bg-brand-blue-light text-white font-bold py-2 px-4 rounded-lg">
                            Start Camera
                        </button>
                    </div>
                )}
            </div>
             <div className="mt-4 h-12 flex items-center justify-center">
                {isRecording && (
                    <div className="flex items-center gap-4 text-lg">
                        <div className="flex items-center gap-2 text-red-500 font-semibold">
                            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                            <span>Recording in progress...</span>
                        </div>
                        <div className="text-white font-jura">
                            Time left: <span className="text-2xl">{countdown}</span>s
                        </div>
                    </div>
                )}
                {!isRecording && videoStream && (
                    <button onClick={startRecording} className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded-lg">
                        Start 10s Recording
                    </button>
                )}
                {!isRecording && recordedVideoUrl && (
                    <button onClick={startCamera} className="w-full bg-brand-blue hover:bg-brand-blue-light text-white font-bold py-2 rounded-lg">
                        Record Again
                    </button>
                )}
            </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-brand-gold/20 text-center">
          <button 
            onClick={handleSubmit} 
            disabled={!licenseFile || !recordedVideoUrl || isSubmitting}
            className="bg-brand-gold text-brand-blue-dark font-bold py-3 px-12 rounded-lg hover:bg-brand-gold-light disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/20 text-lg"
            >
              {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
          </button>
      </div>
    </div>
  );
};

export default ArchitectVerification;
