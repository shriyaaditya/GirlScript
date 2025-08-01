import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const genres = [
  {
    name: "Fiction",
    emoji: "📖",
    description: "Imaginative stories, novels, and literary works",
    color: "from-purple-500 to-pink-500",
    bookCount: "15M+",
  },
  {
    name: "Self-Help",
    emoji: "🌟",
    description: "Personal development and growth guides",
    color: "from-blue-500 to-cyan-500",
    bookCount: "2M+",
  },
  {
    name: "Biography",
    emoji: "👤",
    description: "Real life stories of inspiring people",
    color: "from-green-500 to-teal-500",
    bookCount: "1.5M+",
  },
  {
    name: "Technology",
    emoji: "💻",
    description: "Programming, AI, and digital innovation",
    color: "from-gray-500 to-slate-600",
    bookCount: "500K+",
  },
  {
    name: "History",
    emoji: "🏛️",
    description: "Past events, civilizations, and cultures",
    color: "from-yellow-500 to-orange-500",
    bookCount: "3M+",
  },
  {
    name: "Mythology",
    emoji: "⚡",
    description: "Ancient myths, legends, and folklore",
    color: "from-red-500 to-pink-500",
    bookCount: "200K+",
  },
  {
    name: "Science",
    emoji: "🔬",
    description: "Scientific discoveries and research",
    color: "from-indigo-500 to-purple-500",
    bookCount: "1M+",
  },
  {
    name: "Romance",
    emoji: "💕",
    description: "Love stories and relationship novels",
    color: "from-pink-500 to-rose-500",
    bookCount: "8M+",
  },
  {
    name: "Mystery",
    emoji: "🕵️",
    description: "Thrilling detective and crime stories",
    color: "from-gray-700 to-gray-900",
    bookCount: "4M+",
  },
  {
    name: "Fantasy",
    emoji: "🧙‍♂️",
    description: "Magical worlds and epic adventures",
    color: "from-purple-600 to-indigo-600",
    bookCount: "6M+",
  },
  {
    name: "Horror",
    emoji: "👻",
    description: "Spine-chilling and supernatural tales",
    color: "from-red-700 to-black",
    bookCount: "800K+",
  },
  {
    name: "Adventure",
    emoji: "🗺️",
    description: "Exciting journeys and exploration",
    color: "from-green-600 to-emerald-600",
    bookCount: "2.5M+",
  },
];

const booksCover = [
  {
    title: "White Tiger on Snow Mountain",
    img: "https://books.google.com/books/publisher/content?id=O4maBAAAQBAJ&printsec=frontcover&img=1&zoom=6&edge=curl&imgtk=AFLRE73X8x7P9csSEKrnxCYccejkeOVdumam8IOWWvCkr-37uFNKiXXuPBHvDoV5i4IpQXlTkQ0PMchbK_1apMhyHro93xA6tVYPw5eX_bJLfI5OX3dFZHUSFGVsNZL7nGyEdKvw5Don&source=gbs_api",
    link: "https://pouranik.vercel.app/book/O4maBAAAQBAJ",
    type: "fiction",
  },
  {
    title: "Dune Part 2",
    img: "https://books.google.com/books/content?id=p1MULH7JsTQC&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE726kVz-gsG4mTRpCtPDyhdrtbbkrAUapGER3u7grmN4r_e-6jWvb4u7CLyadTJMndMXNIuIRMVn9mLs8XmRqUpjG2WLCQTWvg8QAwoBPBdIwSl1JcLgWLIuiy3rZVD3QNbtMUOW&source=gbs_api",
    link: "https://pouranik.vercel.app/book/p1MULH7JsTQC",
    type: "science-fiction",
  },
  {
    title: "That Night",
    img: "https://books.google.com/books/publisher/content?id=TnEhEAAAQBAJ&printsec=frontcover&img=1&zoom=6&edge=curl&imgtk=AFLRE72zCBDWWniEkK2sMD2XSlIA4xK6-mfechbz4p4nuRVDjoB5IEJ8iGrOONnWmnT4_HegbOkfOoMnGjyeOpWQyupers9nZ0m1qia6z8tWASTv0ki1O_5yQVTmemZ4h4VFFnebOUN4&source=gbs_api",
    link: "https://pouranik.vercel.app/book/TnEhEAAAQBAJ",
    type: "mystery",
  },
  {
    title: "The Portfolio Book",
    img: "https://books.google.com/books/publisher/content?id=Uf2dCAAAQBAJ&printsec=frontcover&img=1&zoom=6&edge=curl&imgtk=AFLRE72g951bgF_HbFtSFNAvLOZIdH82bmPIsDeS_k9VNsxtci-yNM9GCtL0LarbcbyXVR0Xky8-4xeKIzt3eMDn-wDErGLzoZKUJg0RvNLkOtBbsqW7SGLNMy0ZdjywnelkaQPAAFQI&source=gbs_api",
    link: "https://pouranik.vercel.app/book/Uf2dCAAAQBAJ",
    type: "self help",
  },
  {
    title: "Bill Gates",
    img: "https://books.google.com/books/publisher/content?id=zQbJEAAAQBAJ&printsec=frontcover&img=1&zoom=6&edge=curl&imgtk=AFLRE70hMOoQ9xNafsIqZvyqbv-Bst2LXMZX3fb3YOaXCSrNmfK-e-DQl5rO3uAHRmQxvAVUNN5KHBO_m5ecnTOrk0meGmqV9mrazdMUe2hQuIulKsTUA_aQF4sZge0jwrUnmvV2_rgm&source=gbs_api",
    link: "https://pouranik.vercel.app/book/zQbJEAAAQBAJ",
    type: "biography",
  },
  {
    title: "The Self Help Addict",
    img: "https://books.google.com/books/publisher/content?id=iWpRDwAAQBAJ&printsec=frontcover&img=1&zoom=6&edge=curl&imgtk=AFLRE70v8gRsM0e_gI7ptBDmJyy2A2F61QSE-WDQdeg_99c8Nq88cU8kroF5GwAn2THhG-yIedCDVAP_yFIOrjXe-zHTrVRYYKQhNjKJZO3d2d1qzFBg6xnwE014I1GinzDLseVlJKkQ&source=gbs_api",
    link: "https://pouranik.vercel.app/book/iWpRDwAAQBAJ",
    type: "self help",
  },
  {
    title: "The Fantastic Beasts",
    img: "https://books.google.com/books/publisher/content?id=EcekAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE716foaPXP6TfeVvRpMboOOo7Lfn99lv4W6jiVMNYSBo0ROe7qLDbZzoCHyi5aaTCCjruRDzOWGgL9BpEiLYarkBcUq8UUv8_A2A7fkQka3uWGJEx8qyPysP50KWQqh_VJY_AyXE&source=gbs_api",
    link: "https://pouranik.vercel.app/book/EcekAwAAQBAJ",
    type: "Harry Potter",
  },
]

export default function Genres() {
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
        transition-delay: 0.1s;
      }
      
      .scroll-reveal-delay-2 {
        transition-delay: 0.2s;
      }
      
      .scroll-reveal-delay-3 {
        transition-delay: 0.3s;
      }
      
      .scroll-reveal-delay-4 {
        transition-delay: 0.4s;
      }
      
      .scroll-reveal-scale {
        opacity: 0;
        transform: scale(0.8) translateY(30px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      
      .scroll-reveal-scale.reveal-active {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
      
      .scroll-reveal-slide-left {
        opacity: 0;
        transform: translateX(-50px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      
      .scroll-reveal-slide-left.reveal-active {
        opacity: 1;
        transform: translateX(0);
      }
      
      .scroll-reveal-slide-right {
        opacity: 0;
        transform: translateX(50px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      
      .scroll-reveal-slide-right.reveal-active {
        opacity: 1;
        transform: translateX(0);
      }
      
      .scroll-reveal-fade {
        opacity: 0;
        transition: all 0.6s ease-out;
      }
      
      .scroll-reveal-fade.reveal-active {
        opacity: 1;
      }
      
      .scroll-reveal-stagger > * {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
        transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      
      .scroll-reveal-stagger.reveal-active > *:nth-child(1) { transition-delay: 0.0s; }
      .scroll-reveal-stagger.reveal-active > *:nth-child(2) { transition-delay: 0.1s; }
      .scroll-reveal-stagger.reveal-active > *:nth-child(3) { transition-delay: 0.2s; }
      .scroll-reveal-stagger.reveal-active > *:nth-child(4) { transition-delay: 0.3s; }
      .scroll-reveal-stagger.reveal-active > *:nth-child(5) { transition-delay: 0.4s; }
      .scroll-reveal-stagger.reveal-active > *:nth-child(6) { transition-delay: 0.5s; }
      .scroll-reveal-stagger.reveal-active > *:nth-child(7) { transition-delay: 0.6s; }
      .scroll-reveal-stagger.reveal-active > *:nth-child(8) { transition-delay: 0.7s; }
      .scroll-reveal-stagger.reveal-active > *:nth-child(9) { transition-delay: 0.8s; }
      .scroll-reveal-stagger.reveal-active > *:nth-child(10) { transition-delay: 0.9s; }
      .scroll-reveal-stagger.reveal-active > *:nth-child(11) { transition-delay: 1.0s; }
      .scroll-reveal-stagger.reveal-active > *:nth-child(12) { transition-delay: 1.1s; }
      
      .scroll-reveal-stagger.reveal-active > * {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      
      .scroll-reveal-books-stagger > * {
        opacity: 0;
        transform: translateY(40px) scale(0.9);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      
      .scroll-reveal-books-stagger.reveal-active > *:nth-child(1) { transition-delay: 0.1s; }
      .scroll-reveal-books-stagger.reveal-active > *:nth-child(2) { transition-delay: 0.2s; }
      .scroll-reveal-books-stagger.reveal-active > *:nth-child(3) { transition-delay: 0.3s; }
      .scroll-reveal-books-stagger.reveal-active > *:nth-child(4) { transition-delay: 0.4s; }
      .scroll-reveal-books-stagger.reveal-active > *:nth-child(5) { transition-delay: 0.5s; }
      .scroll-reveal-books-stagger.reveal-active > *:nth-child(6) { transition-delay: 0.6s; }
      .scroll-reveal-books-stagger.reveal-active > *:nth-child(7) { transition-delay: 0.7s; }
      
      .scroll-reveal-books-stagger.reveal-active > * {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen asd">
      {/* Header Section */}
      <section className={`page-hero section-spacing-small scroll-reveal`} ref={addToRefs}>
        <div className="container-modern flex flex-col justify-center items-center text-center">
          <h1
            className={`heading-primary mb-6 floating-animation scroll-reveal-delay-1`}
            style={{ color: "var(--primary-700)" }}
            ref={addToRefs}
          >
            📑 Explore Genre's
          </h1>
          <p
            className={`text-body-large max-w-3xl mx-auto mb-8 scroll-reveal-delay-2`}
            style={{ color: "var(--text-secondary)" }}
            ref={addToRefs}
          >
            Discover books by your favorite categories and explore new literary
            territories. Each genre offers a unique journey into different
            worlds of knowledge and imagination.
          </p>

          {/* Stats */}
          <div className={`glass-effect card-small max-w-2xl mx-auto border-subtle scroll-reveal-scale scroll-reveal-delay-3`} ref={addToRefs}>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div
                  className="text-2xl font-bold"
                  style={{ color: "var(--primary-600)" }}
                >
                  40M+
                </div>
                <div
                  className="text-small"
                  style={{ color: "var(--text-muted)" }}
                >
                  Total Books
                </div>
              </div>
              <div>
                <div
                  className="text-2xl font-bold"
                  style={{ color: "var(--primary-600)" }}
                >
                  12
                </div>
                <div
                  className="text-small"
                  style={{ color: "var(--text-muted)" }}
                >
                  Popular Genres
                </div>
              </div>
              <div>
                <div
                  className="text-2xl font-bold"
                  style={{ color: "var(--primary-600)" }}
                >
                  100+
                </div>
                <div
                  className="text-small"
                  style={{ color: "var(--text-muted)" }}
                >
                  Languages
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Genres Grid */}
      <section className={`section-spacing-small scroll-reveal`} ref={addToRefs}>
        <div className="container-modern">
          <div className={`grid-modern grid-3 scroll-reveal-stagger`} ref={addToRefs}>
            {genres.map((genre, index) => {
              const delay = `${index * 0.1}s`;

              return (
                <Link
                  key={genre.name}
                  to={`/explore?genre=${encodeURIComponent(genre.name)}`}
                  className="block no-underline slide-in-animation group"
                >
                  <article
                    className={`transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform rounded-2xl bg-white border border-[--border-color] shadow-sm hover:shadow-xl flex flex-col h-full min-h-[180px] group relative overflow-hidden group-hover:scale-105`}
                    style={{
                      background: "white",
                      border: "1px solid var(--border-color)",
                      padding: "32px 24px",
                    }}
                  >
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>

                    {/* Decorative Elements */}
                    <div
                      className="absolute -top-4 -right-4 w-16 h-16 rounded-full group-hover:scale-150 transition-transform duration-700"
                      style={{ background: "var(--primary-100)" }}
                    ></div>
                    <div
                      className="absolute -bottom-2 -left-2 w-12 h-12 rounded-full group-hover:scale-150 transition-transform duration-700 delay-100"
                      style={{ background: "var(--primary-50)" }}
                    ></div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col justify-between gap-y-4 h-full">
                      {/* Header */}
                      <div className="group-hover:scale-105 transition-all duration-500">
                        <span className="text-4xl">{genre.emoji}</span>
                        <span className="heading-tertiary group-hover:scale-105 transition-all duration-300">{genre.name}</span>
                      </div>

                      <div
                        className="text-sm border-2 !px-4 !py-1 w-fit rounded-full "
                        style={{ color: "var(--primary-700)" }}>
                        {genre.bookCount} books
                      </div>

                      {/* Description */}
                      <p
                        className="text-body flex-1 leading-relaxed text-start mb-6"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {genre.description}
                      </p>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`p-[80px] flex justify-center items-center scroll-reveal scroll-reveal-scale`} ref={addToRefs}>
        <div className="flex flex-col justify-center max-w-2xl text-center">
          <div className="glass-effect-strong card-modern flex flex-col gap-y-2 border-gradient">
            <div className={`text-5xl mb-6 floating-animation scroll-reveal-delay-1`} ref={addToRefs}>🔍</div>
            <h3
              className={`heading-secondary mb-6 scroll-reveal-delay-2`}
              style={{ color: "var(--primary-700)" }}
              ref={addToRefs}
            >
              Can't Find Your Perfect Genre?
            </h3>
            <p
              className={`text-body-large mb-8 max-w-lg mx-auto scroll-reveal-delay-3`}
              style={{ color: "var(--text-secondary)" }}
              ref={addToRefs}
            >
              Use our advanced search to find books by specific topics, authors,
              keywords, or even ISBN numbers.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center scroll-reveal-delay-4`} ref={addToRefs}>
              <Link
                to="/explore"
                className="button-primary inline-flex items-center gap-3 no-underline"
              >
                <span className="text-xl">🚀</span>
                Advanced Search
              </Link>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="button-secondary inline-flex items-center gap-3"
              >
                <span className="text-xl">⬆️</span>
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Combinations */}
      <section className={`!py-16 scroll-reveal`} ref={addToRefs}>
        <div className="container-modern">
          <div className="text-center mb-12">
            <h3 className={`heading-tertiary text-gray-500 font-semibold text-2xl !mb-12 scroll-reveal-delay-1`} ref={addToRefs}>
              Popular Genre Combinations
            </h3>

            {/* Book covers grid */}
            <div className="mx-auto">
              <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center scroll-reveal-books-stagger scroll-reveal-delay-2`} ref={addToRefs}>
                {booksCover.map(({ title, img, link, type }) => (
                  <div
                    key={title}
                    className="group rounded-lg overflow-hidden grid justify-center items-center shadow-lg"
                  >
                    <a href={link} target="_blank">
                      <img
                        src={img}
                        alt={title}
                        title={title}
                        className="w-[250px] group-hover:scale-105 !pb-4 object-center cursor-pointer transition-all delay-100 h-[300px] object-cover"
                      />
                    </a>

                    <div className="flex flex-col justify-center items-center">
                      <p className="font-semibold text-zinc-800 text-sm">
                        {title}
                      </p>

                      <div
                        className="text-sm !px-4 !py-1 w-fit rounded-full "
                        style={{ color: "var(--primary-700)" }}>
                        Genre : {type}
                      </div>
                    </div>
                  </div>

                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}