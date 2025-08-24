"use client";

import Image from "next/image";
import { ArrowLeft, CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ViewEnum } from "@/types/index";

interface HeaderProps {
  currentView: ViewEnum;
  setIsCreateEditFormOpen: (isOpen: boolean) => void;
}

export function Header({ currentView, setIsCreateEditFormOpen }: HeaderProps) {
  return (
    <div className="relative h-32 sm:h-48 bg-black">
      {/* Header - centered in the top black section */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Image
          src="/assets/Logo@2x.png"
          alt="Todo App Logo"
          width={120}
          height={40}
          className="h-8 w-auto sm:h-10 md:h-12 lg:h-14"
          sizes="(max-width: 640px) 96px, (max-width: 768px) 120px, (max-width: 1024px) 144px, 168px"
          priority
        />
      </div>

      {/* Create Task Button - overlays the black section, bottom edge of black section goes through middle of button */}
      {currentView === ViewEnum.LIST && (
        <div className="absolute w-full max-w-4xl mx-auto px-8 left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2">
          <Button
            onClick={() => setIsCreateEditFormOpen(true)}
            variant="action"
            size="lg"
            className="w-full"
          >
            <span className="font-bold">Create Task</span>
            <CirclePlus className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
