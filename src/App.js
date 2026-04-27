import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const audioRef = useRef(null);

  // Nomor WhatsApp tujuan (ganti dengan nomor kamu)
  const whatsappNumber = '+6285746696663'; // Format: kode negara + nomor tanpa 0

  // Data ucapan untuk 3 kertas
  const cards = [
    {
      title: "Happy Birthday",
      content: "Selamat ulang tahun kakakku Dwi Ivan Maulana! Semoga di umur yang semakin dewasa ini, bisa merubah sedikit demi sedikit pola pikir dan prilaku jadi yang lebih baik",
      photo: "/ultah1.jpeg"
    },
    {
      title: "Happy 21st Birthday",
      content: "Semoga di umur ke 21 tahun ini, bisa lebih mudah untuk mencapai segala cita-cita yang di inginkan, sukses di usia muda dan di mudah kan segala rintangan hidup yang menanti di depan.",
      photo: "/ultah4.jpeg" 
    },
    {
      title: "27 APRIL 2005",
      content: "Tepat 21 tahun yang lalu, kelahiran yang di nantikan oleh kedua orang tua akhirnya tiba, jangan pernah merasa putus asa atas rintangan yang telah menanti di depan, ingatlah bahwa butuh sekitar 9 bulan untuk kedua orang tua menanti sang buah hatinya.",
      photo: "/ultah3.jpeg"
    }
  ];

  const handleEnvelopeClick = () => {
    setIsAnimating(true);
    playMusic();
    setTimeout(() => {
      setIsOpen(true);
      setIsAnimating(false);
    }, 800);
  };

  const handleNextCard = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const handleGoToReply = () => {
    setShowReplyForm(true);
  };

  const handleSendReply = () => {
    if (replyText.trim() === '') {
      alert('Kasih balasan dulu yaa!');
      return;
    }

    // Format pesan untuk WhatsApp
    const message = encodeURIComponent(replyText);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    // Buka WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  const playMusic = () => {
    // Kode mentah untuk musik
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log("Audio play error:", err));
    }
  };

  return (
    <div className="app-container">
      {/* Audio element - placeholder */}
      <audio ref={audioRef} src="hindia.mp3" type="audio/mpeg" loop>
        {/* Ganti src="" dengan path file musik Anda nanti */}
      </audio>

      {!isOpen ? (
        // Tampilkan Amplop
        <div className="envelope-container">
          <div className={`envelope ${isAnimating ? 'opening' : ''}`} onClick={handleEnvelopeClick}>
            <div className="envelope-top"></div>
            <div className="envelope-body">
              <div className="envelope-flap"></div>
            </div>
            <div className="seal">
              <div className="seal-inner"></div>
            </div>
          </div>
        
        </div>
      ) : showReplyForm ? (
        // Tampilkan Form Balasan
        <div className="card-container">
          <div className="card-wrapper">
            <div className="reply-card">
              <div className="reply-header">
                <h2>Balas</h2>
                <p>Chat room untuk membalas pesan</p>
              </div>
              
              <div className="reply-form">
                <textarea
                  className="reply-input"
                  placeholder="Tulis balasanmu di sini..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows="8"
                />
              </div>

              <div className="reply-actions">
                <button className="send-button" onClick={handleSendReply}>
                  Kirim
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Tampilkan Kartu Ucapan
        <div className="card-container">
          <div className="card-wrapper">
            <div className="card">
              {/* Foto Sebelah Kiri */}
              <div className="card-image">
                <img src={cards[currentCard].photo} alt="Dwi Ivan" className="photo" />
              </div>

              {/* Ucapan Sebelah Kanan */}
              <div className="card-text">
                <div className="card-header">
                  <h2>{cards[currentCard].title}</h2>
                </div>
                <div className="card-content">
                  <p>{cards[currentCard].content}</p>
                </div>
              </div>
            </div>

            {/* Cake & Confetti - Hanya muncul di kartu pertama */}
            {currentCard === 0 && (
              <>
                <div className="cake-emoji">🎂</div>
                <div className="confetti-container">
                  {Array.from({ length: 120 }).map((_, i) => {
                    const angle = (i / 120) * Math.PI * 2;
                    const distance = 250;
                    const tx = Math.cos(angle) * distance;
                    const ty = Math.sin(angle) * distance;
                    return (
                      <div
                        key={i}
                        className="confetti"
                        style={{
                          '--tx': `${tx}px`,
                          '--ty': `${ty}px`
                        }}
                      ></div>
                    );
                  })}
                </div>
              </>
            )}
            {/* Tombol Next */}
            {currentCard < cards.length - 1 && (
              <button className="next-button" onClick={handleNextCard}>
                Next →
              </button>
            )}

            {currentCard === cards.length - 1 && (
              <button className="next-button" onClick={handleGoToReply}>
                Balasan 
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
