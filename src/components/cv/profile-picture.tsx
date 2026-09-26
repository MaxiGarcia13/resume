import type { ComponentProps } from 'react';
import { Image } from '@react-pdf/renderer';
import { spaces } from './constants';

type ProfilePictureProps = ComponentProps<typeof Image> & {};

export function ProfilePicture(props: ProfilePictureProps) {
  return (
    <Image
      {...props}
      style={{
        width: 78,
        height: 78,
        borderRadius: 39,
        objectFit: 'cover',
        marginRight: spaces.md,
        ...props.style,
      }}
    />
  );
}
