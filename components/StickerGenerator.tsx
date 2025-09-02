import React, { useState } from 'react';

const StickerGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [stickerUrl, setStickerUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSticker = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.fal.ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_FAL_API_KEY}`,
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setStickerUrl(data.image); // Assuming the API returns the image URL
    } catch (error) {
      console.error('Error generating sticker:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg glassmorphic">
      <h1 className="text-2xl font-bold">AI Sticker Generator</h1>
      <p className="mb-4 text-gray-600">Create your own stickers with AI!</p>
      <input
        type="text"
        placeholder="Enter your prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="p-2 border rounded mb-4"
      />
      <button
        onClick={generateSticker}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {loading ? 'Generating...' : 'Generate Sticker'}
      </button>
      {stickerUrl && (
        <div className="mt-4">
          <img src={stickerUrl} alt="Generated Sticker" className="w-48 h-48" />
          <div className="mt-2">
            <a href={stickerUrl} download className="px-2 py-1 bg-green-500 text-white rounded mr-2">
              Download
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${stickerUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1 bg-blue-400 text-white rounded"
            >
              Share to Twitter
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default StickerGenerator;
