import React, { useState, useEffect } from 'react';
import { X, Bike, Save, PlusCircle } from 'lucide-react';

interface BikeData {
  id?: string;
  make: string;
  model: string;
  year: number;
  category: string;
  area: string;
  dailyRate: number;
  platNomor: string;
  engineDisplacement: string;
  fuelConsumption: string;
  transmission: string;
  status: string;
  unitCondition?: string;
}

interface BikeModalProps {
  isOpen: boolean;
  onClose: () => void;
  bike?: BikeData | null;
  token: string;
  onSaved: () => void;
}

export const BikeModal: React.FC<BikeModalProps> = ({
  isOpen,
  onClose,
  bike,
  token,
  onSaved,
}) => {
  const isEditing = !!bike;

  const [make, setMake] = useState('Honda');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(2024);
  const [category, setCategory] = useState('Matic Harian');
  const [platNomor, setPlatNomor] = useState('D ');
  const [dailyRate, setDailyRate] = useState(90000);
  const [area, setArea] = useState('Stasiun Bandung & Pasteur');
  const [engineDisplacement, setEngineDisplacement] = useState('110 cc');
  const [fuelConsumption, setFuelConsumption] = useState('55 km / L');
  const [transmission, setTransmission] = useState('Otomatis (CVT)');
  const [status, setStatus] = useState('TERSEDIA');
  const [unitCondition, setUnitCondition] = useState('Prima & Bersih');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (bike) {
      setMake(bike.make || 'Honda');
      setModel(bike.model || '');
      setYear(bike.year || 2024);
      setCategory(bike.category || 'Matic Harian');
      setPlatNomor(bike.platNomor || '');
      setDailyRate(bike.dailyRate || 90000);
      setArea(bike.area || 'Stasiun Bandung & Pasteur');
      setEngineDisplacement(bike.engineDisplacement || '110 cc');
      setFuelConsumption(bike.fuelConsumption || '55 km / L');
      setTransmission(bike.transmission || 'Otomatis (CVT)');
      setStatus(bike.status || 'TERSEDIA');
      setUnitCondition(bike.unitCondition || 'Prima & Bersih');
    } else {
      setMake('Honda');
      setModel('');
      setYear(2024);
      setCategory('Matic Harian');
      setPlatNomor('D ');
      setDailyRate(90000);
      setArea('Stasiun Bandung & Pasteur');
      setEngineDisplacement('110 cc');
      setFuelConsumption('55 km / L');
      setTransmission('Otomatis (CVT)');
      setStatus('TERSEDIA');
      setUnitCondition('Prima & Bersih');
    }
  }, [bike, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!model.trim() || !platNomor.trim()) {
      setError('Model motor dan pelat nomor wajib diisi.');
      return;
    }

    setLoading(true);
    setError('');

    const payload = {
      make,
      model,
      year: Number(year),
      category,
      platNomor,
      dailyRate: Number(dailyRate),
      area,
      engineDisplacement,
      fuelConsumption,
      transmission,
      status,
      unitCondition,
    };

    try {
      const url = isEditing ? `/api/admin/bikes/${bike.id}` : '/api/admin/bikes';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Gagal menyimpan data motor.');
        return;
      }

      onSaved();
      onClose();
    } catch {
      setError('Koneksi ke server gagal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#212121] border border-[#333333] rounded-lg max-w-lg w-full p-6 my-auto max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#333333] pb-3">
          <div>
            <span className="text-[11px] font-bold text-[#A0844B] uppercase tracking-wider block">
              Manajemen Armada
            </span>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Bike className="w-5 h-5 text-[#F8E01A]" />
              {isEditing ? `Edit Unit: ${bike.make} ${bike.model}` : 'Tambah Unit Motor Baru'}
            </h3>
          </div>
          <button onClick={onClose} className="text-[#888888] hover:text-white p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="bg-red-950/40 border border-red-800 text-red-300 text-xs p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Make & Model */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#B5B5B5] font-semibold mb-1">Merek (Pabrikan)</label>
              <select
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full bg-[#181818] border border-[#333333] text-white rounded p-2.5 focus:outline-none focus:border-[#A0844B]"
              >
                <option value="Honda">Honda</option>
                <option value="Yamaha">Yamaha</option>
                <option value="Suzuki">Suzuki</option>
                <option value="Kawasaki">Kawasaki</option>
                <option value="Vespa">Vespa</option>
              </select>
            </div>
            <div>
              <label className="block text-[#B5B5B5] font-semibold mb-1">Nama Model</label>
              <input
                type="text"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Contoh: BeAT Street / Vario 160"
                className="w-full bg-[#181818] border border-[#333333] text-white rounded p-2.5 focus:outline-none focus:border-[#A0844B]"
              />
            </div>
          </div>

          {/* Plat Nomor, Tahun, Kategori */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[#B5B5B5] font-semibold mb-1">Pelat Nomor (Bandung)</label>
              <input
                type="text"
                required
                value={platNomor}
                onChange={(e) => setPlatNomor(e.target.value)}
                placeholder="D 1234 MSN"
                className="w-full bg-[#181818] border border-[#333333] text-white rounded p-2.5 font-mono focus:outline-none focus:border-[#A0844B]"
              />
            </div>
            <div>
              <label className="block text-[#B5B5B5] font-semibold mb-1">Tahun Perakitan</label>
              <input
                type="number"
                min="2018"
                max="2026"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value) || 2024)}
                className="w-full bg-[#181818] border border-[#333333] text-white rounded p-2.5 focus:outline-none focus:border-[#A0844B]"
              />
            </div>
            <div>
              <label className="block text-[#B5B5B5] font-semibold mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#181818] border border-[#333333] text-white rounded p-2.5 focus:outline-none focus:border-[#A0844B]"
              >
                <option value="Matic Harian">Matic Harian</option>
                <option value="Maxi Scooter">Maxi Scooter</option>
                <option value="Matic Retro">Matic Retro</option>
              </select>
            </div>
          </div>

          {/* Tarif Harian & Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#B5B5B5] font-semibold mb-1">Tarif Sewa Harian (Rp)</label>
              <input
                type="number"
                step="5000"
                min="50000"
                value={dailyRate}
                onChange={(e) => setDailyRate(parseInt(e.target.value) || 90000)}
                className="w-full bg-[#181818] border border-[#333333] text-white rounded p-2.5 font-semibold focus:outline-none focus:border-[#A0844B]"
              />
            </div>
            <div>
              <label className="block text-[#B5B5B5] font-semibold mb-1">Area Utama</label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Contoh: Stasiun Bandung & Dago"
                className="w-full bg-[#181818] border border-[#333333] text-white rounded p-2.5 focus:outline-none focus:border-[#A0844B]"
              />
            </div>
          </div>

          {/* Status & Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#B5B5B5] font-semibold mb-1">Status Ketersediaan</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#181818] border border-[#333333] text-white rounded p-2.5 focus:outline-none focus:border-[#A0844B]"
              >
                <option value="TERSEDIA">TERSEDIA (Ready to Rent)</option>
                <option value="DISEWA">DISEWA (Sedang Digunakan)</option>
                <option value="SERVIS">SERVIS (Ganti Oli / Bengkel)</option>
              </select>
            </div>
            <div>
              <label className="block text-[#B5B5B5] font-semibold mb-1">Kondisi Unit</label>
              <input
                type="text"
                value={unitCondition}
                onChange={(e) => setUnitCondition(e.target.value)}
                placeholder="Contoh: Prima & Bersih / Baru Servis"
                className="w-full bg-[#181818] border border-[#333333] text-white rounded p-2.5 focus:outline-none focus:border-[#A0844B]"
              />
            </div>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[#888888] font-medium mb-1">Kapasitas Mesin</label>
              <input
                type="text"
                value={engineDisplacement}
                onChange={(e) => setEngineDisplacement(e.target.value)}
                placeholder="110 cc / 125 cc"
                className="w-full bg-[#181818] border border-[#333333] text-white rounded p-2 focus:outline-none focus:border-[#A0844B]"
              />
            </div>
            <div>
              <label className="block text-[#888888] font-medium mb-1">Konsumsi BBM</label>
              <input
                type="text"
                value={fuelConsumption}
                onChange={(e) => setFuelConsumption(e.target.value)}
                placeholder="55 km/L"
                className="w-full bg-[#181818] border border-[#333333] text-white rounded p-2 focus:outline-none focus:border-[#A0844B]"
              />
            </div>
            <div>
              <label className="block text-[#888888] font-medium mb-1">Transmisi</label>
              <input
                type="text"
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className="w-full bg-[#181818] border border-[#333333] text-white rounded p-2 focus:outline-none focus:border-[#A0844B]"
              />
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#2a2a2a] hover:bg-[#333333] text-[#B5B5B5] px-4 py-2 rounded font-semibold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#A0844B] hover:bg-[#8f743f] text-white px-5 py-2 rounded font-bold cursor-pointer transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              {loading ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Tambah Armada'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
