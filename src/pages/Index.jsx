import { useState } from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      title: 'Class Management',
      description:
        'Easily manage your private classes with intuitive scheduling and organization tools.',
      icon: '📚',
    },
    {
      title: 'Teacher & Student Database',
      description:
        'Keep track of all teachers and students with comprehensive profiles and contact information.',
      icon: '👥',
    },
    {
      title: 'Attendance Tracking',
      description: 'Scan QR codes or manually mark attendance with real-time updates and reports.',
      icon: '✅',
    },
    {
      title: 'Payment Management',
      description:
        'Track payments, set fees, and manage financial records for each class and student.',
      icon: '💰',
    },
    {
      title: 'QR Code System',
      description:
        'Generate unique QR codes for each student upon registration for easy attendance marking.',
      icon: '📱',
    },
    {
      title: 'Role-Based Access',
      description:
        'Assign sub-admins with specific permissions for attendance, payments, or viewing only.',
      icon: '🔐',
    },
    {
      title: 'Backup & Recovery',
      description:
        'Securely backup all your data and restore it whenever needed with our reliable system.',
      icon: '💾',
    },
    {
      title: 'Dashboard Analytics',
      description:
        'Get comprehensive insights into your classes, attendance rates, and financial performance.',
      icon: '📊',
    },
  ];

  const testimonials = [
    {
      name: 'Saman Jayawardena',
      role: 'Private Hall Owner, Colombo',
      content:
        'Edusuit has revolutionized how I manage my classes. The attendance tracking and payment system save me hours every week!',
      image: 'https://placehold.co/80x80/3b82f6/ffffff?text=SJ',
    },
    {
      name: 'Nimali Fernando',
      role: 'Mathematics Teacher, Kandy',
      content:
        'The QR code system makes attendance so much easier. Students love it and parents appreciate the transparency.',
      image: 'https://placehold.co/80x80/10b981/ffffff?text=NF',
    },
    {
      name: 'Rajitha Perera',
      role: 'Education Director, Galle',
      content:
        'As a sub-admin, I can focus on what matters most - teaching. The permission system works perfectly for our needs.',
      image: 'https://placehold.co/80x80/f59e0b/ffffff?text=RP',
    },
  ];

  const pricingPlans = [
    {
      name: 'Basic',
      price: 'Free',
      features: [
        'Up to 5 classes',
        'Basic attendance tracking',
        'Manual payments',
        'Limited backup',
        'Email support',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      price: 'LKR 2,500/month',
      features: [
        'Unlimited classes',
        'Advanced attendance',
        'Payment processing',
        'Full backups',
        'Priority support',
        'QR code system',
        'Sub-admin management',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'All Professional features',
        'Custom integrations',
        'Dedicated support',
        'API access',
        'Advanced analytics',
        'Multiple locations',
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/10 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400">
                <span className="text-xl font-bold text-white">E</span>
              </div>
              <span className="text-xl font-bold text-white">EduSuit</span>
            </div>

            <div className="hidden items-center space-x-8 md:flex">
              {['Home', 'Features', 'How It Works', 'Pricing', 'Testimonials', 'Contact'].map(
                (item) => (
                  <a
                    href={`#${item.toLowerCase()}`}
                    key={item}
                    onClick={() => setActiveSection(item.toLowerCase())}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      activeSection === item.toLowerCase()
                        ? 'text-blue-400'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item}
                  </a>
                )
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-md p-2 text-white transition-colors hover:bg-white/10 md:hidden"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="border-t border-white/20 bg-white/10 backdrop-blur-md md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {['Home', 'Features', 'How It Works', 'Pricing', 'Testimonials', 'Contact'].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setActiveSection(item.toLowerCase());
                      setIsMenuOpen(false);
                    }}
                    className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-400/20"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
                  Streamline Your
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Private Class Management
                  </span>
                </h1>
                <p className="text-xl leading-relaxed text-gray-300">
                  EduSuit is the complete solution for private hall owners in Sri Lanka to manage
                  classes, teachers, students, attendance, payments, and more with ease.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="app/dashbord"
                  replace={true}
                  className="transform rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  Get Started Free
                </Link>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Trusted by 150+ Private Halls</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>99.9% Uptime Guarantee</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
                <img
                  src="https://aws-bucket-e-class.s3.eu-north-1.amazonaws.com/assets/images/logos/dashboard.png"
                  alt="EduSuit Dashboard"
                  className="rounded-xl shadow-lg"
                />
              </div>
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500/20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-cyan-400/20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-black/20 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Powerful Features for Private Class Owners
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-400">
              Everything you need to manage your private classes efficiently and professionally.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:transform hover:bg-white/15"
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-semibold text-white">{feature.title}</h3>
                <p className="leading-relaxed text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how it works" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">How EduSuit Works</h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-400">
              Simple steps to get started with your private class management.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Sign Up & Set Up',
                description:
                  'Create your account and add your halls, subjects, and teachers. Configure your class schedules and pricing.',
                icon: '📝',
              },
              {
                step: '2',
                title: 'Manage Classes',
                description:
                  'Schedule classes, assign teachers, and set up student registrations with automatic QR code generation.',
                icon: '📅',
              },
              {
                step: '3',
                title: 'Track & Grow',
                description:
                  'Use our mobile app to mark attendance, process payments, and generate reports to grow your business.',
                icon: '📈',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-md transition-all duration-300 hover:bg-white/15"
              >
                <div className="mb-4 text-5xl">{item.icon}</div>
                <div className="mb-2 text-3xl font-bold text-blue-400">{item.step}</div>
                <h3 className="mb-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="leading-relaxed text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="bg-black/20 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              See Our Dashboard in Action
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-400">
              Experience the power of EduSuit with our intuitive interface.
            </p>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                <h3 className="mb-4 text-2xl font-bold text-white">Dashboard Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-blue-500/20 p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                        <svg
                          className="h-4 w-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Classes</div>
                        <div className="text-blue-400">5 Active</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">5</div>
                      <div className="text-sm text-blue-400">Total</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-purple-500/20 p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500">
                        <svg
                          className="h-4 w-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.336 2.146"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Teachers</div>
                        <div className="text-purple-400">4 Registered</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">4</div>
                      <div className="text-sm text-purple-400">Active</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-green-500/20 p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                        <svg
                          className="h-4 w-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Students</div>
                        <div className="text-green-400">15 Enrolled</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">15</div>
                      <div className="text-sm text-green-400">Total</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                <h3 className="mb-4 text-2xl font-bold text-white">Attendance Tracking</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg bg-gray-800/50 p-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                        <svg
                          className="h-4 w-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Physics</div>
                        <div className="text-sm text-gray-400">Grade 13</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-blue-400">100%</div>
                      <div className="text-sm text-gray-400">Attendance</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
                <img
                  src="https://aws-bucket-e-class.s3.eu-north-1.amazonaws.com/assets/images/logos/payment.png"
                  className="rounded-xl shadow-lg"
                />
              </div>
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500/20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-black/20 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">What Our Users Say</h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-400">
              Trusted by private hall owners across Sri Lanka.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/15"
              >
                <div className="mb-4 flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="mr-4 h-12 w-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
                <div className="leading-relaxed text-gray-300">"{testimonial.content}"</div>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.12a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.12a1 1 0 00-1.175 0l-3.976 2.12c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.12c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-400">
              Choose the plan that fits your private class management needs.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                  plan.popular
                    ? 'scale-105 border-blue-500 bg-gradient-to-br from-blue-500/20 to-cyan-400/20'
                    : 'border-white/20 bg-white/10 backdrop-blur-md'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform rounded-full bg-blue-500 px-4 py-1 text-sm font-semibold text-white">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="mb-2 text-2xl font-bold text-white">{plan.name}</h3>
                  <div className="mb-6 flex items-baseline">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.price !== 'Free' && <span className="ml-2 text-gray-400">/month</span>}
                  </div>

                  <ul className="mb-8 space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <svg
                          className="mr-3 h-5 w-5 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full rounded-lg px-6 py-3 font-semibold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {plan.price === 'Free' ? 'Get Started' : 'Start Trial'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-black/20 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                  Ready to Simplify Your Class Management?
                </h2>
                <p className="mb-6 text-xl text-gray-400">
                  Join thousands of private hall owners across Sri Lanka who are already using
                  EduSuit to streamline their operations.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Email Us</div>
                    <div className="text-gray-400">edusuit.reply@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.54 1.06l-1.519.76a11.042 11.042 0 006.105 6.105l.76-1.519a1 1 0 011.06-.54l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Phone</div>
                    <div className="text-gray-400">+94 72 864 9732</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.707 12.707m-3 2.293a1 1 0 111.414-1.414l1.273 1.273a1 1 0 01-1.414 1.414l-1.273-1.273zm4.95-9.95a1 1 0 011.414 0l1.273 1.273a1 1 0 01-1.414 1.414L18.364 7.042a1 1 0 010-1.414z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Location</div>
                    <div className="text-gray-400">Karandeniya, Sri Lanka</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
                <img
                  src="https://aws-bucket-e-class.s3.eu-north-1.amazonaws.com/assets/images/logos/app2.png"
                  alt="EduSuit Mobile App"
                  className="rounded-xl shadow-lg"
                />
              </div>
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500/20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-cyan-400/20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 bg-white/10 py-12 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-4 flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400">
                  <span className="text-xl font-bold text-white">E</span>
                </div>
                <span className="text-xl font-bold text-white">EduSuit</span>
              </div>
              <p className="mb-6 max-w-md text-gray-400">
                The ultimate solution for private class owners in Sri Lanka to manage their classes,
                teachers, students, and finances efficiently.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.184-.896-.957-2.173-1.555-3.591-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .388.045.768.127 1.132-4.09-.205-7.717-2.165-10.148-5.144-.427.723-.669 1.56-.669 2.455 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-1.683 1.315-3.807 2.105-6.14 2.105-.396 0-.788-.023-1.172-.067 2.181 1.395 4.768 2.212 7.548 2.212 9.054 0 13.99-7.574 13.99-14.062 0-.212-.008-.422-.025-.63-.953.564-2.005.974-3.127 1.184" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.37-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3.05 4.47c-.38.66-.6 1.4-.6 2.19 0 1.5.75 2.84 1.91 3.58-.7-.02-1.36-.22-1.95-.55-.25.7-.39 1.46-.39 2.25 0 1.56.78 2.95 2.01 3.78-.73.2-1.5.3-2.3.3-.57 0-1.13-.05-1.68-.15.56 1.77 2.19 3.04 4.1 3.1-1.5 1.19-3.4 1.9-5.48 1.9-.36 0-.72-.02-1.07-.07 1.97 1.25 4.28 1.99 6.74 2.03-2.47 1.93-5.56 3.07-8.9 3.07-.58 0-1.15-.04-1.71-.12 3.18 2.05 6.95 3.23 11.03 3.23 13.33 0 20.5-11.02 20.5-20.5 0-.31-.01-.62-.03-.92 1.42-.99 2.66-2.26 3.58-3.73z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.06 3.252.148 4.771 1.691 4.919 4.919.048 1.265.059 1.645.059 4.849 0 3.205-.012 3.584-.059 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.048-1.644.059-4.85.059-3.204 0-3.584-.012-4.849-.059-3.252-.149-4.771-1.691-4.919-4.919-.048-1.265-.059-1.644-.059-4.849 0-3.204.012-3.583.059-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.047 1.645-.059 4.849-.059zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.358-.2 6.78-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-white">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 transition-colors hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 transition-colors hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 transition-colors hover:text-white">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 transition-colors hover:text-white">
                    Updates
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-white">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 transition-colors hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 transition-colors hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 transition-colors hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 transition-colors hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/20 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 EduSuit. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
