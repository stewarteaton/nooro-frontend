import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen  text-white">
      {/* Top black section with button positioned halfway down */}
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
        <div className="absolute w-full max-w-4xl mx-auto px-8 -bottom-6 left-1/2 transform -translate-x-1/2">
          <button className="flex w-full items-center justify-center gap-3 bg-[var(--accent-blue-dark)] hover:bg-[var(--accent-blue-dark)]/80 px-6 py-3 rounded-lg transition-colors shadow-lg text-center hover:cursor-pointer">
            <span className="text-white font-medium">Create Task</span>
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-[var(--accent-blue-dark)]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="px-8 py-6 max-w-4xl mx-auto mt-14">
        {/* Task Summary */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent-blue-light)] font-medium">Tasks</span>
            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">
              5
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent-purple)] font-medium">
              Completed
            </span>
            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">
              2 de 5
            </span>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {/* Unchecked tasks */}
          {[1, 2, 3].map((index) => (
            <div
              key={`unchecked-${index}`}
              className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg"
            >
              <div className="w-5 h-5 border-2 border-[var(--accent-blue)] rounded-full cursor-pointer hover:border-[var(--accent-blue)]/80 transition-colors"></div>
              <p className="flex-1 text-gray-300">
                Integer urna interdum massa libero auctor neque turpis turpis
                semper. Duis vel sed fames integer.
              </p>
              <button className="text-gray-400 hover:text-red-400 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}

          {/* Checked/completed tasks */}
          {[1, 2].map((index) => (
            <div
              key={`checked-${index}`}
              className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg"
            >
              <div className="w-5 h-5 bg-[var(--accent-purple)] rounded flex items-center justify-center cursor-pointer hover:bg-[var(--accent-purple)]/80 transition-colors">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="flex-1 text-gray-500 line-through">
                Integer urna interdum massa libero auctor neque turpis turpis
                semper. Duis vel sed fames integer.
              </p>
              <button className="text-gray-400 hover:text-red-400 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
