import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-amber-950/70 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#faf6f1] border-4 border-amber-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl relative overflow-hidden"
          >
            {/* Header */}
            <div className="bg-amber-800 text-amber-50 p-4 text-center shrink-0">
              <h2 className="font-[Coiny] text-2xl tracking-wide">Kebijakan Privasi</h2>
              <p className="text-amber-200 text-sm italic font-serif">Privacy Policy</p>
            </div>

            {/* Isi Teks (Scrollable) */}
            <div className="p-6 overflow-y-auto font-[Nunito] text-amber-950 space-y-8">
              
              {/* --- BLOK BAHASA INDONESIA --- */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b-2 border-amber-200 pb-2 mb-4">
                  <span className="text-2xl drop-shadow-sm">🇮🇩</span>
                  <div>
                    <h3 className="font-[Coiny] text-xl text-amber-900 leading-none">Bahasa Indonesia</h3>
                    <p className="text-xs text-amber-700/80 font-bold tracking-wide mt-1">Diperbarui: 31 Mei 2026</p>
                  </div>
                </div>
                
                <p>Selamat datang di FIELA! Kami sangat menghargai privasi Anda, terutama karena aplikasi ini dirancang sebagai media pembelajaran interaktif untuk anak-anak. Kebijakan ini menjelaskan informasi apa saja yang kami kumpulkan dan bagaimana kami melindunginya.</p>

                <h4 className="font-bold text-lg pt-2">1. Informasi Apa yang Kami Kumpulkan?</h4>
                <p>Saat menggunakan FIELA, kami mengumpulkan data yang sangat terbatas, yaitu: Nama Pengguna (yang diketikkan secara sukarela), Data Progres Belajar (skor, pelafalan, waktu), dan ID Perangkat Acak (untuk mencegah data tertimpa).<br/>
                <span className="font-semibold italic text-amber-800">FIELA tidak meminta atau melacak data sensitif seperti email, kata sandi, lokasi GPS, atau foto wajah.</span></p>

                <h4 className="font-bold text-lg pt-2">2. Untuk Apa Data Tersebut Digunakan?</h4>
                <p>Data yang dikumpulkan dikirimkan secara aman ke peladen awan kami dengan tujuan tunggal: <strong>Riset Akademik dan Evaluasi Pembelajaran</strong>.</p>

                <h4 className="font-bold text-lg pt-2">3. Bagaimana Kami Melindungi Data Anda?</h4>
                <p>Semua data disimpan menggunakan infrastruktur keamanan Google Cloud (Firebase). Kami telah menerapkan aturan keamanan siber yang ketat di mana sistem memblokir akses publik mana pun untuk membaca atau mengunduh basis data riset kami.</p>

                <h4 className="font-bold text-lg pt-2">4. Berbagi Data</h4>
                <p>Kami tidak pernah menjual atau membagikan data siswa kepada pihak ketiga mana pun untuk tujuan periklanan atau komersial.</p>
              </div>

              {/* --- GARIS PEMISAH --- */}
              <div className="w-full h-1 bg-amber-200/50 rounded-full my-6"></div>

              {/* --- BLOK ENGLISH --- */}
              <div className="space-y-4 text-amber-900/90">
                <div className="flex items-center gap-3 border-b-2 border-amber-200 pb-2 mb-4">
                  <span className="text-2xl drop-shadow-sm">🇬🇧</span>
                  <div>
                    <h3 className="font-[Coiny] text-xl text-amber-900 leading-none">English</h3>
                    <p className="text-xs text-amber-700/80 font-bold tracking-wide mt-1">Updated: May 31, 2026</p>
                  </div>
                </div>
                
                <p>Welcome to FIELA! We highly respect your privacy, especially since this app is designed as an interactive learning medium for children. This policy explains what information we collect and how we protect it.</p>

                <h4 className="font-bold text-lg pt-2">1. What Information Do We Collect?</h4>
                <p>When using FIELA, we collect very limited data: User Name (entered voluntarily), Learning Progress Data (scores, pronunciation, time), and a Random Device ID (to prevent data overwriting).<br/>
                <span className="font-semibold italic text-amber-800">FIELA does not request or track sensitive data such as emails, passwords, GPS locations, or facial photos.</span></p>

                <h4 className="font-bold text-lg pt-2">2. How Is The Data Used?</h4>
                <p>The collected data is securely transmitted to our cloud servers for a single purpose: <strong>Academic Research and Educational Evaluation</strong>.</p>

                <h4 className="font-bold text-lg pt-2">3. How Do We Protect Your Data?</h4>
                <p>All data is stored using Google Cloud's secure infrastructure (Firebase). We have implemented strict cybersecurity rules where the system blocks any public access from reading or downloading our research database.</p>

                <h4 className="font-bold text-lg pt-2">4. Data Sharing</h4>
                <p>We never sell or share student data with any third parties for advertising or commercial purposes.</p>
              </div>

            </div>

            {/* Footer / Tombol Tutup */}
            <div className="p-4 bg-amber-100 border-t-2 border-amber-200 flex justify-center shrink-0">
              <Button onClick={onClose} className="bg-amber-700 hover:bg-amber-800 text-white font-[Coiny] px-8 py-6 rounded-xl text-lg shadow-md transition-transform active:scale-95">
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}