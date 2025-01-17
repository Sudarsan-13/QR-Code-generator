import React, { useState } from "react";
import QRCode from "qrcode";
import { FaGithub } from "react-icons/fa";

function QRCodeCard() {
  const [inputText, setInputText] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  const generateQRCode = async () => {
    if (!inputText) return;
    try {
      const url = await QRCode.toDataURL(inputText, {
        color: {
          dark: fgColor,
          light: bgColor,
        },
        width: 300, // Set QR Code size
      });
      setQrCodeUrl(url);
    } catch (err) {
      console.error("Error generating QR code:", err);
    }
  };

  return (
    <div className="bg-purple-800 text-white p-8 rounded-3xl shadow-xl w-[420px]">
      {/* Title */}
      <h1 className="text-center text-3xl font-semibold mb-6 tracking-wide">
        QR<span className="text-purple-400">code</span> generator
      </h1>

      {/* Color Selection */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm uppercase tracking-wide">Set color</span>
        <div className="flex gap-2">
          <button
            onClick={() => setFgColor("#ffffff")}
            className={`w-8 h-8 rounded-full border ${
              fgColor === "#ffffff" ? "border-purple-400" : "border-gray-500"
            }`}
            style={{ backgroundColor: "#ffffff" }}
          ></button>
          <button
            onClick={() => setFgColor("#000000")}
            className={`w-8 h-8 rounded-full border ${
              fgColor === "#000000" ? "border-purple-400" : "border-gray-500"
            }`}
            style={{ backgroundColor: "#000000" }}
          ></button>
        </div>
      </div>

      {/* QR Code Preview */}
      <div className="flex justify-center items-center bg-white rounded-md p-4 mb-6 h-72">
        {qrCodeUrl ? (
          <img
            src={qrCodeUrl}
            alt="Generated QR Code"
            className="max-w-full max-h-full"
          />
        ) : (
          <div className="text-gray-500">QR Code Preview</div>
        )}
      </div>

      {/* Input Field */}
      <div className="mb-4">
        <label className="block text-sm mb-1 uppercase tracking-wide">
          Submit URL or text
        </label>
        <input
          type="text"
          className="w-full p-2 bg-purple-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter text or URL here"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={generateQRCode}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-md font-semibold transition-transform transform hover:scale-105"
      >
        Generate
      </button>

      {/* Download Button */}
      {qrCodeUrl && (
        <a
          href={qrCodeUrl}
          download="qrcode.png"
          className="w-full block text-center bg-purple-700 hover:bg-purple-800 text-white p-2 rounded-md font-semibold mt-4 transition-transform transform hover:scale-105"
        >
          Download
        </a>
      )}

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-400 text-sm">
        <div className="flex items-center justify-center gap-2">
          <span>Made with ❤️ using React</span>
          <a
            href="https://github.com/your-github-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-400 transition-colors"
          >
            <FaGithub className="inline-block text-2xl" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default QRCodeCard;
