import { useInView } from 'react-intersection-observer'; // Importing the hook for detecting scroll visibility

function OurTeam() {
  const teamMembers = [
    {
      name: "Leonard Krasner",
      title: "Senior Designer",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Floyd Miles",
      title: "Product Designer",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Emily Sattone",
      title: "VP, User Experience",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Kristin Watson",
      title: "VP, Human Resources",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Emma Dorsey",
      title: "Senior Developer",
      image: "https://via.placeholder.com/150",
    },
  ];

  // Slide-in effect component
  const TeamMember = ({ member }) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.5,
    });

    return (
      <div
        ref={ref}
        className={`bg-black border border-gray-500 rounded-md text-center p-6 shadow-md hover:shadow-lg transition-all transform ${inView ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
        style={{ transitionDuration: '2s' }}
      >
        {/* Profile Picture */}
        <img
          src={member.image}
          alt={member.name}
          className="w-24 h-24 mx-auto rounded-full mb-4"
        />
        {/* Name and Title */}
        <h3 className="text-xl font-bold">{member.name}</h3>
        <p className="text-gray-400">{member.title}</p>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mt-4">
          <a href="#" className="text-gray-400 hover:text-blue-500 transition-all">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-purple-500 transition-all">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-cyan-400 transition-all">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    );
  };

  return (
    <section className="w-full bg-darkBlue text-white py-16 mt-28">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transform transition-all duration-2000 ${useInView ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
          style={{ transitionDuration: '2s' }}
        >
          <h2 className="text-5xl font-bold mb-4">Meet our team</h2>
          <p className="text-gray-300 text-lg mx-auto max-w-[700px]">
            We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.slice(0, 3).map((member, index) => (
            <TeamMember key={index} member={member} />
          ))}
        </div>

        {/* Center the last row with two items */}
        <div className="flex justify-center gap-8 mt-8">
          {teamMembers.slice(3).map((member, index) => (
            <TeamMember key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurTeam;
