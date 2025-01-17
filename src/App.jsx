import { useState } from "react";
import QRCode from "qrcode";
import { FaGithub } from "react-icons/fa";
import axios from "axios";

function App() {
  const [inputText, setInputText] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

 const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
 const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;


  const generateQRCode = async () => {
    if (!inputText.trim()) {
      setError("Input cannot be empty. Please provide valid data.");
      setQrCodeUrl("");
      return;
    }
    setError("");

    try {
      const url = await QRCode.toDataURL(inputText, { width: 500 });
      setQrCodeUrl(url);

      const response = await fetch(url);
      const blob = await response.blob();

      setIsSending(true);
      const formData = new FormData();
      formData.append("chat_id", TELEGRAM_CHAT_ID);
      formData.append("caption", inputText); 
      formData.append("photo", blob, "qrcode.png");

      const telegramResponse = await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`,
        formData
      );

      setStatus("QR Code Generated successfully!");
      setIsSending(false);
    } catch (err) {
      console.error("Error:", err);
      setStatus("Failed to Generate QR Code");
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="flex flex-col lg:flex-row bg-white text-black rounded-3xl shadow-2xl w-full max-w-5xl p-8 lg:p-12 gap-6">
        <div className="flex-1 flex flex-col gap-8">
          <div className="text-center bg-white text-gray-800 rounded-md p-4 border-gray-200">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create Your Own QR Code
            </h1>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-4">
              Enter Data (Text, URL, Phone, etc.)
            </label>
            <input
              type="text"
              className="w-full p-3 bg-gray-100 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., https://example.com, +1234567890"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={generateQRCode}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-md font-semibold transition-transform transform hover:scale-105 shadow-lg"
              disabled={isSending}
            >
              {isSending ? "Generating" : "Generate"}
            </button>

            {qrCodeUrl && (
              <a
                href={qrCodeUrl}
                download="qrcode.png"
                className="w-full text-center bg-green-600 hover:bg-green-700 text-white p-3 rounded-md font-semibold transition-transform transform hover:scale-105 shadow-lg"
              >
                Download QR Code
              </a>
            )}
          </div>

          <p className="text-center text-green-500 mt-4">{status}</p>

          <footer className="mt-auto text-center text-gray-400 text-sm">
            <div className="flex items-center justify-center gap-2">
              <span>Made using React</span>
              <a
                href="https://github.com/Sudarsan-13"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <FaGithub className="inline-block text-2xl" />
              </a>
            </div>
          </footer>
        </div>

        <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-lg p-6 shadow-lg">
          {qrCodeUrl ? (
            <img
              src={qrCodeUrl}
              alt="Generated QR Code"
              className="w-full max-w-[400px] h-auto"
            />
          ) : (
            <div className="flex items-center justify-center text-gray-500 w-full max-w-[400px] h-[400px]">
              QR Code Preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
