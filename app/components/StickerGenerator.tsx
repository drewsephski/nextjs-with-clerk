import React, { useState } from 'react';

const StickerGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [stickerUrl, setStickerUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSticker = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-sticker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setStickerUrl(data.stickerUrl);
    } catch (error) {
      console.error('Error generating sticker:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 shadow-lg">
      <h1 className="text-2xl font-bold">Sticker Generator</h1>
      <p className="text-gray-500">Create your own custom stickers!</p>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt..."
        className="border p-2 rounded w-full mt-4"
      />
      <button
        onClick={generateSticker}
        className="bg-blue-500 text-white p-2 rounded mt-2"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Sticker'}
      </button>
      {stickerUrl && (
        <div className="mt-4">
          <img src={stickerUrl} alt="Generated Sticker" className="w-48 h-48" />
          <div className="flex space-x-2 mt-2">
            <a href={stickerUrl} download className="bg-green-500 text-white p-2 rounded">
              Download
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${stickerUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-400 text-white p-2 rounded"
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
