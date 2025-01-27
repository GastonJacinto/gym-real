import type React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src: string;
  name: string;
  email: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, email }) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0">
        <Image
          src={'https://avatar.iran.liara.run/public/boy'}
          alt={`${name}'s avatar`}
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-gray-500">{email}</span>
      </div>
    </div>
  );
};
