import GradientText from "@/components/global/gradient-text"
import { Button } from "@/components/ui/button"
import { BadgePlus } from "lucide-react"
import Link from "next/link"

type Props = {}

const CallToAction = (props: Props) => {
    return (
        <div className="flex flex-col items-start md:items-center gap-y-5 md:gap-y-0">
            <GradientText
                className="text-[35px] md:text-[40px] lg:text-[55px] xl:text-[70px] 2xl:text-[80px] leading-tight font-semibold"
                element="H1"
            >
                Revolutionizing Client <br className="md:hidden" /> Outreach
            </GradientText>
            <p className="text-sm md:text-center mt-2 text-left text-muted-foreground">
                Opal is a dynamic platform that enables users to
                <br className="md:hidden" />
                engage, collaborate, and <br className="hidden md:block" />{" "}
                build meaningful connections.
                <br className="md:hidden" />
                And also record real time Videos of your Screen.
            </p>
            <div className="flex md:flex-row flex-col md:justify-center gap-5 md:mt-5 w-full">
                <Button variant="outline" className="rounded-xl text-base">
                    Watch Demo
                </Button>
                <Link href="/auth/sign-in">
                    <Button className="rounded-xl text-base flex gap-2 w-full">
                        <BadgePlus /> Get Started
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default CallToAction
