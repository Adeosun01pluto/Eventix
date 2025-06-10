import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Star, Users, ArrowRight, Menu, X, Search, Filter, Heart, Share2, Ticket, Mail, Phone, MapPinIcon, Facebook, Twitter, Instagram, ChevronDown, ChevronUp } from 'lucide-react';

const Eventix = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const events = [
    {
      id: 1,
      title: "Summer Music Festival 2025",
      date: "2025-07-15",
      time: "18:00",
      location: "Central Park, New York",
      price: 89,
      category: "music",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500&h=300&fit=crop",
      description: "Join us for the biggest summer music festival featuring top artists from around the world. Experience incredible performances, food trucks, and unforgettable memories.",
      capacity: 5000,
      sold: 3200,
      rating: 4.8,
      organizer: "MusicEvents Inc.",
      features: ["Live Music", "Food & Drinks", "Parking Available", "VIP Packages"]
    },
    {
      id: 2,
      title: "Tech Innovation Conference",
      date: "2025-08-22",
      time: "09:00",
      location: "Convention Center, San Francisco",
      price: 299,
      category: "tech",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop",
      description: "Discover the latest in technology innovation with industry leaders, workshops, and networking opportunities.",
      capacity: 1500,
      sold: 890,
      rating: 4.9,
      organizer: "TechHub Events",
      features: ["Networking", "Workshops", "Free WiFi", "Lunch Included"]
    },
    {
      id: 3,
      title: "Food & Wine Tasting",
      date: "2025-09-10",
      time: "19:00",
      location: "Waterfront Plaza, Miami",
      price: 125,
      category: "food",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=300&fit=crop",
      description: "Indulge in exquisite cuisine and fine wines from renowned chefs and wineries in a beautiful waterfront setting.",
      capacity: 300,
      sold: 180,
      rating: 4.7,
      organizer: "Culinary Experiences",
      features: ["Wine Tasting", "Chef Presentations", "Live Jazz", "Valet Parking"]
    },
    {
      id: 4,
      title: "Art & Culture Exhibition",
      date: "2025-10-05",
      time: "10:00",
      location: "Museum of Arts, Chicago",
      price: 45,
      category: "culture",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
      description: "Explore contemporary art and cultural exhibits featuring local and international artists.",
      capacity: 800,
      sold: 420,
      rating: 4.6,
      organizer: "Arts Council",
      features: ["Guided Tours", "Artist Meet & Greet", "Gift Shop", "Café"]
    },
    {
      id: 5,
      title: "Fitness & Wellness Expo",
      date: "2025-11-18",
      time: "08:00",
      location: "Sports Complex, Los Angeles",
      price: 65,
      category: "sports",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
      description: "Join fitness enthusiasts for workshops, demonstrations, and wellness activities.",
      capacity: 2000,
      sold: 1100,
      rating: 4.5,
      organizer: "Wellness Group",
      features: ["Fitness Classes", "Health Screenings", "Nutrition Talks", "Equipment Demos"]
    },
    {
      id: 6,
      title: "Comedy Night Special",
      date: "2025-12-03",
      time: "20:00",
      location: "Comedy Club, Austin",
      price: 35,
      category: "entertainment",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=300&fit=crop",
      description: "Laugh out loud with top comedians performing their best material in an intimate setting.",
      capacity: 200,
      sold: 150,
      rating: 4.9,
      organizer: "Laugh Factory",
      features: ["Stand-up Comedy", "Drinks Available", "Reserved Seating", "Photo Ops"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Events', icon: Calendar },
    { id: 'music', name: 'Music', icon: Users },
    { id: 'tech', name: 'Technology', icon: Search },
    { id: 'food', name: 'Food & Drink', icon: Heart },
    { id: 'culture', name: 'Culture', icon: Star },
    { id: 'sports', name: 'Sports', icon: Clock },
    { id: 'entertainment', name: 'Entertainment', icon: Share2 }
  ];

  const getTimeUntilEvent = (eventDate) => {
    const now = new Date();
    const event = new Date(eventDate);
    const diff = event - now;
    
    if (diff < 0) return 'Event passed';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} days, ${hours} hours`;
    return `${hours} hours`;
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (eventId) => {
    setFavorites(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const Header = () => (
    <header className="bg-white shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Eventix
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {['home', 'events', 'contact'].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`capitalize font-medium transition-all duration-300 hover:text-purple-600 relative group ${
                  currentPage === page ? 'text-purple-600' : 'text-gray-700'
                }`}
              >
                {page === 'events' ? 'Upcoming Events' : page}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4 animate-fade-in">
            {['home', 'events', 'contact'].map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 px-4 rounded-lg mb-2 capitalize font-medium transition-all duration-300 ${
                  currentPage === page 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page === 'events' ? 'Upcoming Events' : page}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );

  const HomePage = () => (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              Where Events
              <span className="block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                Begin
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up-delay">
              Discover amazing events, connect with like-minded people, and create unforgettable memories
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay-2">
              <button
                onClick={() => setCurrentPage('events')}
                className="bg-white text-purple-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
              >
                Explore Events
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-purple-900 transition-all duration-300 hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Why Choose Eventix?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Easy Discovery",
                description: "Find events that match your interests with our powerful search and filtering system."
              },
              {
                icon: Ticket,
                title: "Secure Booking",
                description: "Book tickets with confidence using our secure payment system and instant confirmation."
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "Connect with event organizers and attendees to build lasting relationships."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-gray-800">Featured Events</h2>
            <button
              onClick={() => setCurrentPage('events')}
              className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-300"
            >
              View All
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.slice(0, 3).map((event, index) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                onClick={() => {
                  setSelectedEvent(event);
                  setCurrentPage('event-details');
                }}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(event.id);
                      }}
                      className={`p-2 rounded-full ${
                        favorites.includes(event.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-gray-600'
                      } hover:scale-110 transition-all duration-300`}
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-600">${event.price}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{event.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const EventsPage = () => (
    <div className="py-8 animate-fade-in">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Upcoming Events</h1>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-300 lg:hidden"
            >
              <Filter className="w-5 h-5" />
              Filters
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
          
          <div className={`mt-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-purple-600 hover:text-purple-600'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer animate-slide-up"
              onClick={() => {
                setSelectedEvent(event);
                setCurrentPage('event-details');
              }}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(event.id);
                    }}
                    className={`p-2 rounded-full ${
                      favorites.includes(event.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-600'
                    } hover:scale-110 transition-all duration-300`}
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full bg-white text-gray-600 hover:scale-110 transition-all duration-300"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {getTimeUntilEvent(event.date)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                  {event.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-purple-600">${event.price}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{event.rating}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(event.sold / event.capacity) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  {event.sold} / {event.capacity} tickets sold
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );

  const EventDetailsPage = () => {
    if (!selectedEvent) return <div>Event not found</div>;

    return (
      <div className="py-8 animate-fade-in">
        <div className="container mx-auto px-4">
          <button
            onClick={() => setCurrentPage('events')}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6 transition-colors duration-300"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            Back to Events
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                <div className="relative">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => toggleFavorite(selectedEvent.id)}
                      className={`p-3 rounded-full ${
                        favorites.includes(selectedEvent.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-gray-600'
                      } hover:scale-110 transition-all duration-300`}
                    >
                      <Heart className="w-6 h-6" />
                    </button>
                    <button className="p-3 rounded-full bg-white text-gray-600 hover:scale-110 transition-all duration-300">
                      <Share2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                
                <div className="p-8">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                    {selectedEvent.title}
                  </h1>
                  
                  <div className="flex flex-wrap gap-6 text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span>{selectedEvent.rating} ({Math.floor(Math.random() * 500) + 100} reviews)</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Tickets sold: {selectedEvent.sold} / {selectedEvent.capacity}
                      </span>
                      <span className="text-sm font-medium text-gray-600">
                        {Math.round(((selectedEvent.capacity - selectedEvent.sold) / selectedEvent.capacity) * 100)}% available
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${(selectedEvent.sold / selectedEvent.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">About This Event</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">{selectedEvent.description}</p>
                    
                    <h3 className="text-xl font-bold mb-3 text-gray-800">Event Features</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedEvent.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-600">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">Organizer</h3>
                    <p className="text-gray-600">{selectedEvent.organizer}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    ${selectedEvent.price}
                  </div>
                  <p className="text-gray-600">per ticket</p>
                </div>

                <div className="mb-6">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl text-center mb-4">
                    <div className="text-lg font-semibold">
                      {getTimeUntilEvent(selectedEvent.date)}
                    </div>
                    <div className="text-sm opacity-90">until event starts</div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-xl">
                    <button
                      onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                      className="p-3 text-gray-600 hover:text-purple-600 transition-colors duration-300"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-semibold">{ticketQuantity}</span>
                    <button
                      onClick={() => setTicketQuantity(Math.min(10, ticketQuantity + 1))}
                      className="p-3 text-gray-600 hover:text-purple-600 transition-colors duration-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal ({ticketQuantity} ticket{ticketQuantity > 1 ? 's' : ''})</span>
                    <span className="font-semibold">${selectedEvent.price * ticketQuantity}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Service fee</span>
                    <span className="font-semibold">${Math.round(selectedEvent.price * ticketQuantity * 0.1)}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span className="text-purple-600">${Math.round(selectedEvent.price * ticketQuantity * 1.1)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentPage('buy-ticket')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Ticket className="w-5 h-5" />
                  Buy Tickets
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Secure payment • Instant confirmation • Money-back guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const BuyTicketPage = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      billingAddress: ''
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
        alert('🎉 Booking confirmed! Check your email for tickets.');
        setCurrentPage('events');
      }, 3000);
    };

    if (!selectedEvent) return <div>Please select an event first</div>;

    return (
      <div className="py-8 animate-fade-in">
        <div className="container mx-auto px-4 max-w-4xl">
          <button
            onClick={() => setCurrentPage('event-details')}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6 transition-colors duration-300"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            Back to Event Details
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Complete Your Booking</h1>
                
                {/* Progress Steps */}
                <div className="flex items-center mb-8">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        currentStep >= step 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step}
                      </div>
                      {step < 3 && (
                        <div className={`w-16 h-1 mx-2 ${
                          currentStep > step ? 'bg-purple-600' : 'bg-gray-200'
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit}>
                  {currentStep === 1 && (
                    <div className="animate-slide-in">
                      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="animate-slide-in">
                      <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Billing Address *
                        </label>
                        <textarea
                          name="billingAddress"
                          value={formData.billingAddress}
                          onChange={handleInputChange}
                          required
                          rows="3"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="animate-slide-in">
                      <h2 className="text-xl font-semibold mb-4">Review & Confirm</h2>
                      <div className="bg-gray-50 rounded-xl p-6 mb-6">
                        <h3 className="font-semibold mb-2">Booking Summary</h3>
                        <p className="text-gray-600 mb-1">Name: {formData.firstName} {formData.lastName}</p>
                        <p className="text-gray-600 mb-1">Email: {formData.email}</p>
                        <p className="text-gray-600">Phone: {formData.phone || 'Not provided'}</p>
                      </div>
                      <div className="flex items-center mb-6">
                        <input type="checkbox" required className="mr-2" />
                        <label className="text-sm text-gray-600">
                          I agree to the Terms of Service and Privacy Policy
                        </label>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                      >
                        Previous
                      </button>
                    )}
                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(currentStep + 1)}
                        className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors duration-300"
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Ticket className="w-5 h-5" />
                            Complete Booking
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h3>
                
                <div className="flex items-center mb-4">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{selectedEvent.title}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tickets ({ticketQuantity}x)</span>
                    <span className="font-semibold">${selectedEvent.price * ticketQuantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service fee</span>
                    <span className="font-semibold">${Math.round(selectedEvent.price * ticketQuantity * 0.1)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span className="text-purple-600">${Math.round(selectedEvent.price * ticketQuantity * 1.1)}</span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-sm">Secure Payment</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ContactPage = () => {
    const [contactForm, setContactForm] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    const handleContactSubmit = (e) => {
      e.preventDefault();
      alert('Thank you for your message! We\'ll get back to you soon.');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    };

    const handleContactChange = (e) => {
      setContactForm({
        ...contactForm,
        [e.target.name]: e.target.value
      });
    };

    return (
      <div className="py-8 animate-fade-in">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Get in Touch</h1>
            <p className="text-xl text-gray-600">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Send us a Message</h2>
              <form onSubmit={handleContactSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Email</p>
                      <p className="text-gray-600">hello@eventix.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Phone</p>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <MapPinIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Address</p>
                      <p className="text-gray-600">123 Event Street<br />New York, NY 10001</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Follow Us</h2>
                <div className="flex gap-4">
                  <button className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center hover:bg-blue-200 transition-colors duration-300">
                    <Facebook className="w-6 h-6 text-blue-600" />
                  </button>
                  <button className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center hover:bg-blue-200 transition-colors duration-300">
                    <Twitter className="w-6 h-6 text-blue-400" />
                  </button>
                  <button className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center hover:bg-pink-200 transition-colors duration-300">
                    <Instagram className="w-6 h-6 text-pink-600" />
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
                <p className="mb-4 opacity-90">
                  Our support team is available 24/7 to assist you with any questions or concerns.
                </p>
                <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300">
                  Get Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Footer = () => (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Eventix</span>
            </div>
            <p className="text-gray-400 mb-4">
              Where Events Begin. Discover amazing events and create unforgettable memories.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors duration-300" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors duration-300" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors duration-300" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentPage('home')} className="text-gray-400 hover:text-white transition-colors duration-300">Home</button></li>
              <li><button onClick={() => setCurrentPage('events')} className="text-gray-400 hover:text-white transition-colors duration-300">Events</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="text-gray-400 hover:text-white transition-colors duration-300">Contact</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-400">Music</span></li>
              <li><span className="text-gray-400">Technology</span></li>
              <li><span className="text-gray-400">Food & Drink</span></li>
              <li><span className="text-gray-400">Sports</span></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-400">Help Center</span></li>
              <li><span className="text-gray-400">Terms of Service</span></li>
              <li><span className="text-gray-400">Privacy Policy</span></li>
              <li><span className="text-gray-400">Refund Policy</span></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Eventix. All rights reserved. Made with ❤️ for event enthusiasts.
          </p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'events' && <EventsPage />}
      {currentPage === 'event-details' && <EventDetailsPage />}
      {currentPage === 'buy-ticket' && <BuyTicketPage />}
      {currentPage === 'contact' && <ContactPage />}
      
      <Footer />

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slide-in {
          from { 
            opacity: 0; 
            transform: translateX(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
        
        .animate-slide-up-delay {
          animation: slide-up 0.6s ease-out 0.2s both;
        }
        
        .animate-slide-up-delay-2 {
          animation: slide-up 0.6s ease-out 0.4s both;
        }
        
        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Eventix;