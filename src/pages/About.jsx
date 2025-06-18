import { NavBar, Footer } from "../components/index.js";

function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow px-6 py-10 bg-white text-black max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-orange-500">About Us</h1>
        <p className="text-lg mb-6">
          Welcome to <strong>BlogVerse</strong> – a dynamic platform where ideas, stories, and creativity thrive.
          Our mission is to empower writers, creators, and curious minds to share their voice with the world.
        </p>
        <p className="text-lg mb-6">
          Whether you're a seasoned blogger, an aspiring writer, or a passionate reader, BlogVerse provides a space to connect, create, and explore. 
          With powerful tools and an engaged community, we make content publishing and discovery seamless and rewarding.
        </p>
        <p className="text-lg mb-6">
          Built by a team of creators and developers, BlogVerse was born from the idea that everyone has something valuable to say. 
          We believe in freedom of expression, collaborative growth, and the power of community-driven content.
        </p>
        <p className="text-lg">
          Thank you for being a part of our journey. Together, let’s make the internet a little more insightful, one post at a time.
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default About;
