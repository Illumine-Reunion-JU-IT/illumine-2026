import Center from '@/assets/coming_soon_svgs/svg/Center';
import Group92 from '@/assets/coming_soon_svgs/svg/Group92';
import Group93 from '@/assets/coming_soon_svgs/svg/Group93';
import Group94 from '@/assets/coming_soon_svgs/svg/Group94';
import Frame30 from '@/assets/coming_soon_svgs/svg/Frame30';
import Vector from '@/assets/coming_soon_svgs/svg/Vector';
import Vector1 from '@/assets/coming_soon_svgs/svg/Vector1';
import Vector2 from '@/assets/coming_soon_svgs/svg/Vector2';

export default function MainGraphic() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 w-full h-full z-0">
        <Center />
      </div>
      <div className="absolute inset-0 w-full h-full z-10">
        <Group94 />
      </div>
      <div className="absolute inset-0 w-full h-full z-20">
        <Group93 />
      </div>
      <div className="absolute inset-0 w-full h-full z-30">
        <Group92 />
      </div>
      <div className="absolute inset-0 w-full h-full z-40">
        <Frame30 />
      </div>
      <div className="absolute inset-0 w-full h-full z-50">
        <Vector />
      </div>
      <div className="absolute inset-0 w-full h-full z-[60]">
        <Vector1 />
      </div>
      <div className="absolute inset-0 w-full h-full z-[70]">
        <Vector2 />
      </div>
    </div>
  );
}
