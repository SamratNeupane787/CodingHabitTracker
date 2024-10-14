import Link from "next/link";
import { Leaf, CheckCircle, Sprout, Sun, Zap } from "lucide-react";
import Header from "./Components/Header";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F8FA] text-black">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Leaf className="h-6 w-6 text-green-500" />
          <span className="ml-2 text-xl font-bold text-black">
            CodeHabitTracker
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 text-black items-center">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#pricing"
          >
            Pricing
          </Link>
          <button className="text-sm font-medium hover:underline underline-offset-4">
            Log in
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-black">
                  Grow Your Coding Habits
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Plant the seeds of success. Nurture your coding skills. Watch
                  your progress bloom.
                </p>
              </div>
              <div>
                <Header />
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <input
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Get Started
                  </button>
                </form>
                <p className="text-xs text-gray-500">
                  Start your 14-day free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-black">
              Features to Help You Grow
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Sprout className="h-8 w-8 mb-2 text-green-500" />
                <h3 className="text-xl font-bold mb-2 text-black">
                  Plant Your Habits
                </h3>
                <p className="text-gray-600">
                  Set up your coding habits and watch them grow day by day.
                  Start small and build consistency.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Sun className="h-8 w-8 mb-2 text-yellow-500" />
                <h3 className="text-xl font-bold mb-2 text-black">
                  Nurture Your Skills
                </h3>
                <p className="text-gray-600">
                  Track your progress and get insights on your coding journey.
                  Identify areas for improvement.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Zap className="h-8 w-8 mb-2 text-blue-500" />
                <h3 className="text-xl font-bold mb-2 text-black">
                  Boost Your Productivity
                </h3>
                <p className="text-gray-600">
                  Gamify your coding routine and stay motivated with streaks,
                  achievements, and rewards.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-black">
                  Your Coding Garden
                </h2>
                <p className="text-gray-500 md:text-xl">
                  Visualize your progress with our unique garden metaphor. Each
                  habit is a plant that grows as you consistently work on it.
                  Watch your garden flourish as you develop your skills.
                </p>
                <ul className="grid gap-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    <span>Daily coding streaks grow your plants</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    <span>
                      Achieve milestones to unlock new plant varieties
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    <span>Share your garden to inspire others</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
                  [Garden Visualization Placeholder]
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
        ></section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-black">
                  Start Growing Your Coding Skills Today
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Join thousands of developers who are cultivating their coding
                  habits and watching their skills bloom.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <input
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Get Started
                  </button>
                </form>
                <p className="text-xs text-gray-500">
                  14-day free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2024 CodeHabitTracker. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
