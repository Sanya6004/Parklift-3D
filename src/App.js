import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { 
  CarFront, MapPin, Phone, Mail, CheckCircle2, 
  Target, Lightbulb, Building2, Map, Users, ChevronRight, UserCircle2
} from 'lucide-react';

// 1. 3D Car Component
function Car() {
  const carRef = useRef();

  useFrame((state) => {
    const t = Math.sin(state.clock.getElapsedTime()); 
    carRef.current.position.z = 1 - (t * 2);
    carRef.current.rotation.y = t * 0.15;
  });

  return (
    <group ref={carRef}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1.8, 0.5, 3.5]} />
        <meshStandardMaterial color="#5b4ee4" />
      </mesh>
      <mesh position={[0, 0.9, -0.2]} castShadow>
        <boxGeometry args={[1.6, 0.5, 1.8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Wheels */}
      <mesh position={[-0.9, 0.2, 1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0.9, 0.2, 1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[-0.9, 0.2, -1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0.9, 0.2, -1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
    </group>
  );
}

// 2. Parking Spot
function ParkingSpot() {
  return (
    <group position={[0, 0, -1]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[10, 15]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>
      <mesh position={[-1.5, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.1, 4]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>
      <mesh position={[1.5, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.1, 4]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>
      <mesh position={[0, 0, -2]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[0.1, 3.1]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>
    </group>
  );
}

// 3. Main 3D Scene Wrapper
function Animated3DParkingElement() {
  return (
    <group rotation={[0.2, -0.5, 0]}>
      <ParkingSpot />
      <Car />
    </group>
  );
}

// 4. Main App Component
export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen selection:bg-[#5b4ee4] selection:text-white">
      
      {/* Navbar */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm p-4 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <CarFront className="w-8 h-8 text-[#5b4ee4] group-hover:scale-110 transition-transform duration-300" />
            <h1 className="text-2xl font-bold text-[#5b4ee4]">ParkLift</h1>
          </div>
          
          <div className="hidden md:flex space-x-6 items-center text-sm font-semibold">
            {['Home', 'About Us', 'Service', 'Solutions', 'Our Services', 'Contact Us'].map((item) => (
              <a key={item} href="#" className="hover:text-[#5b4ee4] transition-colors duration-300 relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5b4ee4] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button className="bg-[#5b4ee4] text-white px-5 py-2 rounded-lg hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
              Get Started
            </button>
          </div>

          <button 
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white border-t border-gray-100 flex flex-col space-y-4 pt-4 pb-2 text-sm font-semibold animate-fade-in-down">
            {['Home', 'About Us', 'Service', 'Solutions', 'Our Services', 'Contact Us'].map((item) => (
              <a key={item} href="#" className="hover:text-[#5b4ee4] block px-2 hover:translate-x-2 transition-transform duration-300">{item}</a>
            ))}
            <button className="bg-[#5b4ee4] text-white px-5 py-2 rounded-lg mx-2 hover:bg-indigo-700 transition-colors duration-300 w-[calc(100%-16px)]">Get Started</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-white py-20 px-5 relative border-b border-gray-100 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50/50 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Shaping the Future of <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5b4ee4] to-purple-600">Parking</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              Our mission is to be the best Parking Solutions provider in India by delivering unprecedented value to our customers, investors, and partners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#5b4ee4] text-white px-8 py-3 rounded-lg font-bold shadow-[0_4px_14px_0_rgba(91,78,228,0.39)] hover:shadow-[0_6px_20px_rgba(91,78,228,0.23)] hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                Our Services <ChevronRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-[#5b4ee4] text-[#5b4ee4] px-8 py-3 rounded-lg font-bold hover:bg-indigo-50 hover:-translate-y-1 transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>
          
          {/* 3D WebGL Area */}
          <div className="md:w-1/2 h-[350px] md:h-[450px] w-full mt-14 md:mt-0 relative cursor-grab active:cursor-grabbing hover:scale-[1.02] transition-transform duration-500">
            <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
              <Animated3DParkingElement />
              <OrbitControls autoRotate={false} enableZoom={false} />
            </Canvas>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-5 bg-gray-50/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#5b4ee4] inline-block relative">
            Our Story
            <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-indigo-200 rounded-full"></span>
          </h2>
          <p className="text-gray-600 mb-16 max-w-2xl mx-auto mt-6">Founded with a vision to revolutionize parking, we've grown from a local startup to a global leader in parking solutions</p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { year: "2025", title: "The Beginning", desc: "\"While hanging out with friends, this idea came to life. We started with a simple idea: parking shouldn't be stressful.\"", icon: Lightbulb },
              { year: "2027", title: "First Major Contract", desc: "Landed our first city-wide parking management contract proving our innovative approach worked at scale.", icon: Building2 },
              { year: "2030", title: "Industry Leader", desc: "Recognized as the #1 parking solutions provider worldwide, serving over 500 cities across 4 States.", icon: Map }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-[#5b4ee4] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <item.icon className="w-10 h-10 text-indigo-200 group-hover:text-[#5b4ee4] transition-colors duration-300 mb-4" />
                <h3 className="font-bold text-xl mb-2 text-gray-800 flex items-center gap-2">
                  <span className="bg-indigo-100 text-[#5b4ee4] px-2 py-1 rounded text-sm">{item.year}</span> {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#5b4ee4]">Our Mission & Vision</h2>
            <p className="text-gray-600">Driving innovation in parking to create seamless experiences for everyone.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-indigo-50/50 p-10 rounded-3xl hover:bg-indigo-50 transition-colors duration-300 border border-indigo-100/50">
              <div className="bg-[#5b4ee4] w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">To be the best Parking Solutions provider in India by delivering unprecedented value and opportunity to our customers, investors, and partners through innovative technology and exceptional service.</p>
              <ul className="space-y-4 text-gray-700">
                {['Revolutionize urban mobility through smart parking', 'Reduce congestion and environmental impact', 'Create seamless parking experiences'].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#5b4ee4] shrink-0" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-indigo-50/50 p-10 rounded-3xl hover:bg-indigo-50 transition-colors duration-300 border border-indigo-100/50">
              <div className="bg-[#5b4ee4] w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-800">Our Vision</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">To shape the future of Parking Services by developing technologies that make parking effortless, efficient, and environmentally friendly for cities, and businesses.</p>
              <ul className="space-y-4 text-gray-700 font-medium">
                {['Pioneer AI-powered parking solutions', 'Expand to 28 States by 2030', 'Eliminate parking frustrations globally'].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#5b4ee4] shrink-0" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-5 bg-gradient-to-r from-[#5b4ee4] to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center relative z-10">
          {[
            { num: "500+", label: "Cities Served", icon: Building2 },
            { num: "4", label: "States", icon: Map },
            { num: "10M+", label: "Daily Parkings", icon: CarFront },
            { num: "2,500", label: "Team Members", icon: Users }
          ].map((stat, idx) => (
            <div key={idx} className="hover:-translate-y-2 transition-transform duration-300 p-4 rounded-xl hover:bg-white/10">
              <stat.icon className="w-10 h-10 mx-auto mb-4 opacity-80" />
              <h3 className="text-5xl font-extrabold mb-2 tracking-tight">{stat.num}</h3>
              <p className="text-indigo-100 font-medium text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Team (Wapas aa gaya!) */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#5b4ee4] inline-block relative">
            Meet Our Leadership
            <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-indigo-200 rounded-full"></span>
          </h2>
          <p className="text-gray-600 mb-16 mt-6">The visionary team driving our global parking revolution.</p>
          
          <div className="grid md:grid-cols-3 gap-10">
            {/* Founder & CEO */}
            <div className="bg-gray-50 p-8 rounded-2xl flex flex-col items-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-gray-100">
              <div className="w-24 h-24 bg-indigo-100 rounded-full mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <UserCircle2 className="w-14 h-14 text-[#5b4ee4]" />
              </div>
              <h4 className="font-bold text-2xl text-gray-800">Sagar Pawar</h4>
              <p className="text-md font-bold text-[#5b4ee4] mt-2 bg-indigo-50 px-4 py-1 rounded-full">Founder & CEO</p>
            </div>

            {/* CTO */}
            <div className="bg-gray-50 p-8 rounded-2xl flex flex-col items-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-gray-100">
              <div className="w-24 h-24 bg-indigo-100 rounded-full mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <UserCircle2 className="w-14 h-14 text-[#5b4ee4]" />
              </div>
              <h4 className="font-bold text-2xl text-gray-800">Sanjeev Thakur</h4>
              <p className="text-md font-bold text-[#5b4ee4] mt-2 bg-indigo-50 px-4 py-1 rounded-full">Chief Technology Officer</p>
            </div>

            {/* COO */}
            <div className="bg-gray-50 p-8 rounded-2xl flex flex-col items-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-gray-100">
              <div className="w-24 h-24 bg-indigo-100 rounded-full mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <UserCircle2 className="w-14 h-14 text-[#5b4ee4]" />
              </div>
              <h4 className="font-bold text-2xl text-gray-800">Shivam Yadav</h4>
              <p className="text-md font-bold text-[#5b4ee4] mt-2 bg-indigo-50 px-4 py-1 rounded-full">Chief Operations Officer</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-5 bg-gray-100 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Ready to Transform Your Parking Experience?</h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-lg">Join thousands of satisfied customers who trust us for their daily parking needs.</p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
          <button className="bg-[#5b4ee4] text-white px-8 py-4 rounded-xl font-bold w-full sm:w-auto hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            Get a Free Consultation
          </button>
          <button className="border-2 border-[#5b4ee4] text-[#5b4ee4] bg-white px-8 py-4 rounded-xl font-bold w-full sm:w-auto hover:bg-indigo-50 hover:-translate-y-1 transition-all duration-300">
            Learn About Our Solutions
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-gray-400 py-16 px-5 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <CarFront className="w-6 h-6 text-[#5b4ee4]" />
              <h4 className="text-white font-bold text-xl">ParkLift</h4>
            </div>
            <p className="mb-4 leading-relaxed">Shaping the future of parking with smart, reliable, and innovative solutions across India.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Solutions</h4>
            <ul className="space-y-3">
              {['Smart Parking', 'Municipal Solutions', 'Commercial Parking', 'Residential Parking'].map(item => (
                <li key={item}><a href="#" className="hover:text-[#5b4ee4] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Blog', 'Contact'].map(item => (
                <li key={item}><a href="#" className="hover:text-[#5b4ee4] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#5b4ee4] shrink-0 mt-0.5" />
                <span>E-38/39, Rajiv Chowk, Inner Circle, Block E<br/>Connaught Place, New Delhi 110001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#5b4ee4]" />
                <span>+91 70224 84565</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#5b4ee4]" />
                <span>contact@parklift.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-center gap-4">
          <p>&copy; 2025 ParkLift Solutions. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
      
    </div>
  );
}