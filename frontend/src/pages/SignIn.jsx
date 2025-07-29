import { useState, useEffect, useRef } from "react"
import AuthForm from "../components/AuthForm";

const SignIn = ({ isDarkMode }) => {  // Add isDarkMode prop
  const [formType, setFormType] = useState('signin');
  const sectionsRef = useRef([]);

  // Scroll reveal effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    }, observerOptions);

    // Observe all sections
    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  // Add CSS for scroll reveal animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .scroll-reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      
      .scroll-reveal.reveal-active {
        opacity: 1;
        transform: translateY(0);
      }
      
      .scroll-reveal-delay-1 {
        transition-delay: 0.2s;
      }
      
      .scroll-reveal-delay-2 {
        transition-delay: 0.4s;
      }
      
      .scroll-reveal-delay-3 {
        transition-delay: 0.6s;
      }
      
      .scroll-reveal-scale {
        opacity: 0;
        transform: scale(0.9) translateY(30px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      
      .scroll-reveal-scale.reveal-active {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
      
      .scroll-reveal-slide-up {
        opacity: 0;
        transform: translateY(40px);
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      
      .scroll-reveal-slide-up.reveal-active {
        opacity: 1;
        transform: translateY(0);
      }
      
      .scroll-reveal-fade {
        opacity: 0;
        transition: all 0.6s ease-out;
      }
      
      .scroll-reveal-fade.reveal-active {
        opacity: 1;
      }
      
      .auth-form-reveal {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
        transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      
      .auth-form-reveal.reveal-active {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      
      .auth-toggle-reveal {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        transition-delay: 0.3s;
      }
      
      .auth-toggle-reveal.reveal-active {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Re-trigger animations when form type changes
  useEffect(() => {
    // Clear existing refs and re-add them to trigger new animations
    sectionsRef.current = [];
    
    // Small delay to ensure DOM updates
    setTimeout(() => {
      const newElements = document.querySelectorAll('.auth-form-reveal, .auth-toggle-reveal');
      newElements.forEach((element) => {
        element.classList.remove('reveal-active');
        sectionsRef.current.push(element);
      });
      
      // Trigger animations after a brief moment
      setTimeout(() => {
        newElements.forEach((element) => {
          element.classList.add('reveal-active');
        });
      }, 50);
    }, 50);
  }, [formType]);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const handleChangeFormType = () => {
    if(formType==='signin'){
      setFormType('signup');
    }else{
      setFormType('signin');
    }
  }

  return (
    <div className="scroll-reveal" ref={addToRefs}>
      <section className='flex justify-center items-center !w-full lg:flex !mt-5'>
        <div className="w-full">
          {formType === 'signin' ? (
            <section className='flex flex-col !space-y-7 w-full rounded-2xl justify-center items-center'>
              <div className="auth-form-reveal" ref={addToRefs}>
                <AuthForm formType={formType} isDarkMode={isDarkMode} />
              </div>
              <p className={`auth-toggle-reveal ${isDarkMode ? 'text-white' : 'text-gray-800'}`} ref={addToRefs}>
                Don't have an account ? 
                <button 
                  className='cursor-pointer bg-white !text-black !py-1 !mx-2 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded px-3' 
                  onClick={handleChangeFormType}
                >
                  Sign-Up
                </button>
              </p>
            </section>
          ) : (
            <section className='flex flex-col !space-y-7 rounded-2xl justify-center items-center'>
              <div className="auth-form-reveal" ref={addToRefs}>
                <AuthForm formType={formType} isDarkMode={isDarkMode} />
              </div>
              <p className={`auth-toggle-reveal ${isDarkMode ? 'text-white' : 'text-gray-800'}`} ref={addToRefs}>
                Already have an account ?
                <button 
                  className='cursor-pointer bg-white !text-black !py-1 !mx-2 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded px-3' 
                  onClick={handleChangeFormType}
                >
                  Sign-In
                </button>
              </p>
            </section>
          )}
        </div>
      </section>
    </div>
  )
}

export default SignIn