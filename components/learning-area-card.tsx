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

export function LearningAreaCard({ icon, title, description, progress, href }: LearningAreaCardProps) {
  const { Icon, bgColor, iconColor } = iconMap[icon]

  return (
    <Link href={href}>
      <Card className="group cursor-pointer border-sand-200 bg-white p-6 transition-all hover:shadow-lg">
        <div className="flex items-start gap-4">
          <div className={`rounded-2xl ${bgColor} p-4`}>
            <Icon className={`h-8 w-8 ${iconColor}`} />
          </div>

          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xl font-bold text-charcoal group-hover:text-terracotta">{title}</h3>
              <span className="text-sm font-medium text-charcoal/60">{progress}%</span>
            </div>

            <p className="mb-3 text-charcoal/70">{description}</p>

            <div className="mb-2">
              <div className="text-sm text-charcoal/60">Progress</div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-sand-100">
              <div className="h-full rounded-full bg-terracotta transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
