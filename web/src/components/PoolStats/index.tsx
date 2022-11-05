import Image from "next/image";

interface PoolStatsProps {
  icon: any;
  description: string;
  stats: number;
}

export default function PoolStats(props: PoolStatsProps) {
  const { icon, description, stats } = props

  return (
    <div className="flex gap-6 items-center">
      <Image
        src={icon}
        alt="Ícone de check"
        quality={100}
      />
      <div className=" flex flex-col">
        <span className="text-2xl font-bold leading-normal">+{stats}</span>
        <span className="text-base leading-relaxed">{description}</span>
      </div>
    </div>
  )
}