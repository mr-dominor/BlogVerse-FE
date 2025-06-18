
import { Footer } from '../components/index.js';
import NavBar from '../components/NavBar';
import emailjs from 'emailjs-com';
import { useRef,useState } from 'react';

function Contact() {
  const form = useRef();
  const [sentStatus,setSentStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      import.meta.process.env.EMAILJS_SERVICES_ID,
      import.meta.process.env.EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.process.env.EMAILJS_PUBLIC_ID
    ).then(
      (result) => {
        alert("Message sent successfully!");
        console.log(result.text);
      },
      (error) => {
        alert("Something went wrong. Try again.");
      }
    );

    e.target.reset();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow px-4 py-8 bg-white text-black w-full">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-6 text-center">
            Contact Us
          </h1>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="user_name"
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="user_email"
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                rows="5"
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition-all"
              onClick={()=>handleSend()}
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Contact;
