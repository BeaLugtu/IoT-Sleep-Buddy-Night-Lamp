import { Settings, Save, PowerSettingsNew, AccountCircle } from '@mui/icons-material'; // Importing new icons for better context

function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-black mt-20">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-6 text-white">How It Works</h2>
        <p className="text-white mb-16 text-xl w-[700px] mx-auto">
          Manage your Sleep Buddy Night Lamp with ease! Set up schedules, customize lighting preferences, and monitor the status all from one place.
        </p>

        <div className="flex justify-center items-center space-x-16 relative">
          {/* Create Step */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-opacity-20 backdrop-blur-lg bg-white rounded-lg flex items-center justify-center shadow-lg">
              <Settings className="text-blue-500 text-6xl" /> {/* Increased icon size */}
            </div>
            <p className="mt-4 text-white text-xl">Create</p>
          </div>

          {/* Publish Step */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-opacity-20 backdrop-blur-lg bg-white rounded-lg flex items-center justify-center shadow-lg">
              <Save className="text-green-500 text-6xl" /> {/* Increased icon size */}
            </div>
            <p className="mt-4 text-white text-xl">Save Preferences</p>
          </div>

          {/* Start Lamp Control Step */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-opacity-20 backdrop-blur-lg bg-white rounded-lg flex items-center justify-center shadow-lg">
              <PowerSettingsNew className="text-yellow-500 text-6xl" /> {/* Increased icon size */}
            </div>
            <p className="mt-4 text-white text-xl">Activate Lamp</p>
          </div>

          {/* Manage Step */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-opacity-20 backdrop-blur-lg bg-white rounded-lg flex items-center justify-center shadow-lg">
              <AccountCircle className="text-red-500 text-6xl" /> {/* Increased icon size */}
            </div>
            <p className="mt-4 text-white text-xl">Manage Settings</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
