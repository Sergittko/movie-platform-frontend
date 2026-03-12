import { Upload, User } from 'lucide-react';
import Image from 'next/image';
import { FC, useRef, useState } from 'react';
import { Path } from 'react-hook-form';

interface IAvatarInputProps {
  setFormValue: (name: Path<string>, file: File) => void;
}

const AvatarInput: FC<IAvatarInputProps> = ({ setFormValue }) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarChange = (file: File | undefined) => {
    if (!file) return;

    setFormValue('avatar', file);

    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        onClick={() => fileInputRef.current?.click()}
        className="relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 transition hover:bg-white/20"
      >
        {avatarPreview ? (
          <Image src={avatarPreview} alt="avatar" fill className="object-cover" />
        ) : (
          <User className="h-10 w-10 text-white/60" />
        )}
      </div>

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-1 text-xs text-white/70 hover:text-white"
      >
        <Upload size={14} />
        Upload avatar
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleAvatarChange(e.target.files?.[0])}
      />
    </div>
  );
};

export default AvatarInput;
