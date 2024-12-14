import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline';

function BeUpdated() {
  return (
    <section className="w-full  text-white px-36 mt-11">
      <div className="relative isolate overflow-hiddenpy-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl font-semibold tracking-tight">
              Get notified when we’re launching
            </h2>
            <p className="mt-4 text-lg text-gray-300 max-w-[500px] break-words mx-auto">
              Stay updated and be the first to experience the future of lighting with IoT-enabled smart lamps.
            </p>

            <div className="mt-8 flex justify-center">
              <div className="flex gap-4 w-full max-w-lg"> {/* Add max-w-lg to control the width of the container */}
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="w-full rounded-md bg-white/10 px-4 py-2 text-base text-white outline-none placeholder:text-gray-500 focus:outline-indigo-500 sm:text-sm"
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
                >
                  Notify me
                </button>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
      </div>
    </section>
  );
}

export default BeUpdated;
