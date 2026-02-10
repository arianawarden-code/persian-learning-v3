import Link from "next/link"
import { Card } from "@/components/ui/card"
import { FileText, BookOpenCheck, PenTool, Languages, MessageCircle, Mic } from "lucide-react"

type IconType = "vocabulary" | "grammar" | "reading" | "writing" | "pronunciation" | "conversation"

interface LearningAreaCardProps {
  icon: IconType
  title: string
  description: string
  progress: number
  href: string
}

const iconMap = {
  vocabulary: { Icon: Languages, bgColor: "bg-terracotta/10", iconColor: "text-terracotta" },
  grammar: { Icon: FileText, bgColor: "bg-green-100", iconColor: "text-green-700" },
  reading: { Icon: BookOpenCheck, bgColor: "bg-amber-100", iconColor: "text-amber-700" },
  writing: { Icon: PenTool, bgColor: "bg-blue-100", iconColor: "text-blue-700" },
  pronunciation: { Icon: Mic, bgColor: "bg-purple-100", iconColor: "text-purple-700" },
  conversation: { Icon: MessageCircle, bgColor: "bg-terracotta/10", iconColor: "text-terracotta" },
}

function ProgressRing({ progress }: { progress: number }) {
  const isComplete = progress >= 100
  const size = 44
  const strokeWidth = 3.5
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(progress, 100) / 100) * circumference

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(196,107,72,0.2)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#c46b48"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold text-terracotta">{progress}%</span>
      </div>
    </div>
  )
}

export function LearningAreaCard({ icon, title, description, progress, href }: LearningAreaCardProps) {
  const { Icon, bgColor, iconColor } = iconMap[icon]

  return (
    <Link href={href} className="h-full">
      <Card className="group flex h-full cursor-pointer flex-col border-sand-200 bg-white px-8 pt-8 pb-12 transition-all hover:shadow-lg">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className={`rounded-2xl ${bgColor} p-4`}>
            <Icon className={`h-10 w-10 ${iconColor}`} />
          </div>
          <ProgressRing progress={progress} />
        </div>

        <h3 className="text-xl font-bold text-charcoal group-hover:text-terracotta leading-tight">{title}</h3>
        <p className="text-sm text-charcoal/60 -mt-4">{description}</p>
      </Card>
    </Link>
  )
}
