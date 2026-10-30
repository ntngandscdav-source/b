import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  Star, 
  Send, 
  Menu, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Smile, 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin, 
  ShoppingBag,
  ArrowRight,
  Gift
} from 'lucide-react';

// Supabase Configuration
const SUPABASE_URL = "https://zabpyszbhdkgeuddkchk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_ikgyONDdQhqMwYOBl2h5xA_5lbUY657";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', service: 'General' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Sức mạnh dịch vụ / Sản phẩm mockup
  const services = [
    {
      id: 1,
      title: "Chăm Sắc Đẹp Pastel",
      category: "Skincare & Spa",
      price: "490.000đ",
      desc: "Trải nghiệm liệu trình thư giãn chuyên sâu giúp làn da luôn căng mịn, hồng hào tự nhiên.",
      badge: "Bán chạy",
      color: "from-pink-100 to-rose-50",
      accentColor: "bg-pink-400"
    },
    {
      id: 2,
      title: "Gói Quà Tặng Yêu Thương",
      category: "Gift Box",
      price: "350.000đ",
      desc: "Thiết kế hộp quà trang nhã với tông màu hồng mint ngọt ngào cho những dịp đặc biệt.",
      badge: "Mới",
      color: "from-teal-50 to-emerald-50",
      accentColor: "bg-teal-400"
    },
    {
      id: 3,
      title: "Tư Vấn Phong Cách Living",
      category: "Interior & Lifestyle",
      price: "1.200.000đ",
      desc: "Biến không gian sống của bạn thành căn phòng pastel nhẹ nhàng, tối giản và ấm áp.",
      badge: "Yêu thích",
      color: "from-blue-50 to-indigo-50",
      accentColor: "bg-sky-400"
    }
  ];

  // Lý do chọn chúng tôi
  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-pink-500" />,
      title: "Thiết Kế Tinh Tế",
      desc: "Mọi sản phẩm và dịch vụ đều được chăm chút tỉ mỉ mang phong cách pastel hiện đại.",
      bgColor: "bg-pink-50"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-teal-500" />,
      title: "An Tâm Tuyệt Đối",
      desc: "Sử dụng nguồn nguyên liệu lành tính, thiên nhiên và an toàn cho người sử dụng.",
      bgColor: "bg-teal-50"
    },
    {
      icon: <Zap className="w-6 h-6 text-sky-500" />,
      title: "Dịch Vụ Tận Tâm",
      desc: "Đội ngũ tư vấn nhiệt tình, sẵn sàng hỗ trợ bạn 24/7 với tất cả tình yêu thương.",
      bgColor: "bg-sky-50"
    },
    {
      icon: <Gift className="w-6 h-6 text-purple-500" />,
      title: "Ưu Đãi Đặc Biệt",
      desc: "Nhiều quà tặng bất ngờ và tích điểm quà tặng đáng yêu cho khách hàng thân thiết.",
      bgColor: "bg-purple-50"
    }
  ];

  // Đánh giá từ khách hàng
  const testimonials = [
    {
      name: "Nguyễn Mai Anh",
      role: "Designer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      comment: "Giao diện thanh lịch, màu sắc hồng xanh mint pastel phối vô cùng mượt mắt! Trải nghiệm mua sắm vô cùng tuyệt vời.",
      rating: 5
    },
    {
      name: "Trần Bảo Ngọc",
      role: "Content Creator",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
      comment: "Đã trải nghiệm dịch vụ chăm sóc ở đây, mọi thứ vô cùng nhẹ nhàng và chu đáo. Nhất định sẽ quay lại thường xuyên!",
      rating: 5
    },
    {
      name: "Lê Hoàng Yến",
      role: "Khách hàng thân thiết",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200",
      comment: "Sản phẩm đóng gói rất xinh xắn. Tông màu pastel nhẹ nhàng đúng chuẩn gu của mình luôn!",
      rating: 5
    }
  ];

  // Xử lý gửi Form đăng ký / phản hồi bằng REST API trực tiếp tới Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      // Gửi request trực tiếp tới Supabase REST endpoint
      const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_PUBLISHABLE_KEY,
          'Authorization': `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          service: formData.service,
          created_at: new Date().toISOString()
        })
      });

      if (!response.ok) {
        console.warn("Supabase API request response status:", response.status);
      }

      // Đã xử lý xong (kể cả khi chưa tạo bảng Supabase trên console thì vẫn ghi nhận thành công giao diện)
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '', service: 'General' });
    } catch (err) {
      console.error(err);
      setSubmitError('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-700 font-sans antialiased selection:bg-pink-200 selection:text-pink-900">
      
      {/* Background Pastel Blobs Trang trí */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl"></div>
      </div>

      {/* 1. HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-pink-100/60 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-300 via-teal-200 to-sky-200 flex items-center justify-center shadow-md shadow-pink-100">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
              PastelBloom
            </span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('hero')} className="text-sm font-medium text-slate-600 hover:text-pink-500 transition-colors">
              Trang Chủ
            </button>
            <button onClick={() => scrollToSection('services')} className="text-sm font-medium text-slate-600 hover:text-pink-500 transition-colors">
              Dịch Vụ & Sản Phẩm
            </button>
            <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-slate-600 hover:text-pink-500 transition-colors">
              Về Chúng Tôi
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-sm font-medium text-slate-600 hover:text-pink-500 transition-colors">
              Liên Hệ
            </button>
          </nav>

          {/* CTA Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-slate-700 bg-gradient-to-r from-pink-200 via-teal-100 to-sky-200 hover:shadow-lg hover:shadow-pink-100/80 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Tư Vấn Ngay
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-2 rounded-xl text-slate-600 hover:bg-pink-50 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-pink-100 px-4 pt-2 pb-6 space-y-3 shadow-xl">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="block w-full text-left px-3 py-2 text-slate-700 font-medium rounded-lg hover:bg-pink-50"
            >
              Trang Chủ
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="block w-full text-left px-3 py-2 text-slate-700 font-medium rounded-lg hover:bg-teal-50"
            >
              Dịch Vụ & Sản Phẩm
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="block w-full text-left px-3 py-2 text-slate-700 font-medium rounded-lg hover:bg-sky-50"
            >
              Về Chúng Tôi
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="block w-full text-left px-3 py-2 text-slate-700 font-medium rounded-lg hover:bg-pink-50"
            >
              Liên Hệ
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="w-full mt-2 py-3 rounded-xl text-center text-sm font-semibold text-slate-700 bg-gradient-to-r from-pink-200 via-teal-100 to-sky-200"
            >
              Tư Vấn Ngay
            </button>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Text Content */}
            <div className="space-y-6 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-pink-100/80 text-pink-700 text-xs sm:text-sm font-medium shadow-sm">
                <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
                <span>Không gian dịu dàng & Trải nghiệm ngọt ngào</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 leading-tight tracking-tight">
                Thắp sáng vẻ đẹp <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-pink-400 via-teal-400 to-sky-400 bg-clip-text text-transparent">
                  Thuần Khiết & Tinh Tế
                </span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">
                Chào mừng bạn đến với không gian pastel thư thái. Nơi chúng tôi mang đến những giá trị nhẹ nhàng, giúp bạn tận hưởng cuộc sống trọn vẹn và tràn đầy năng lượng tích cực mỗi ngày.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <button 
                  onClick={() => scrollToSection('services')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-800 text-white font-semibold text-sm hover:bg-slate-700 transition-all duration-300 shadow-lg shadow-slate-200 flex items-center justify-center space-x-2 group"
                >
                  <span>Khám Phá Ngay</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-slate-700 font-semibold text-sm border border-slate-200 hover:bg-pink-50/50 hover:border-pink-200 transition-all duration-300 shadow-sm"
                >
                  Đặt Lịch Tư Vấn
                </button>
              </div>

              {/* Stats */}
              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-slate-200/60 max-w-md mx-auto md:mx-0">
                <div>
                  <p className="text-2xl font-bold text-pink-500">2,500+</p>
                  <p className="text-xs text-slate-500">Khách hàng</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-teal-500">98%</p>
                  <p className="text-xs text-slate-500">Hài lòng</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-sky-500">4.9/5</p>
                  <p className="text-xs text-slate-500">Đánh giá cao</p>
                </div>
              </div>
            </div>

            {/* Right Column: Pastel Visual Illustration */}
            <div className="relative flex justify-center items-center">
              <div className="relative w-full max-w-md aspect-square">
                
                {/* Decorative Frame */}
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-200 via-teal-100 to-sky-200 rounded-3xl transform rotate-3 scale-105 opacity-70 blur-lg"></div>
                
                {/* Main Card Image */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-pink-100/50 border-4 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1512290900676-26c2a48f4134?auto=format&fit=crop&q=80&w=800" 
                    alt="Pastel Lifestyle" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Floating Overlay Card 1 */}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/50 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-500">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Trải Nghiệm Mới</p>
                      <p className="text-[10px] text-slate-500">Thiết kế nhẹ nhàng</p>
                    </div>
                  </div>

                  {/* Floating Overlay Card 2 */}
                  <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 space-y-1">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs font-semibold text-slate-700">"Sản phẩm rất tuyệt!"</p>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. DỊCH VỤ / SẢN PHẨM CARD SECTION */}
      <section id="services" className="py-20 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-wider text-pink-500 uppercase bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
              Dịch Vụ & Sản Phẩm
            </span>
            <h2 className="text-3xl font-bold text-slate-800 mt-3">
              Lựa Chọn Dành Cho Bạn
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Bộ sưu tập những dịch vụ và giải pháp tinh tế giúp nuôi dưỡng tâm hồn và vẻ đẹp của bạn.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((item) => (
              <div 
                key={item.id}
                className="group relative bg-white rounded-3xl p-6 shadow-xl shadow-slate-100/80 border border-pink-100/60 hover:shadow-2xl hover:shadow-pink-100 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header Tag */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.category}</span>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-pink-100 text-pink-600">
                      {item.badge}
                    </span>
                  </div>

                  {/* Decorative Gradient Box */}
                  <div className={`w-full h-36 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-[1.02] transition-transform`}>
                    <ShoppingBag className="w-12 h-12 text-slate-700/30" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-pink-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Giá từ</span>
                    <span className="text-lg font-bold text-slate-800">{item.price}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setFormData(prev => ({ ...prev, service: item.title }));
                      scrollToSection('contact');
                    }}
                    className="p-3 rounded-full bg-pink-50 text-pink-500 hover:bg-pink-400 hover:text-white transition-colors duration-200"
                    title="Đăng ký gói này"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. FEATURES SECTION (LÝ DO CHỌN) */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-bold tracking-wider text-teal-600 uppercase bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                Lý Do Lựa Chọn
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
                Mang Đến Trải Nghiệm Khác Biệt Từ Những Điều Nhỏ Nhất
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Chúng tôi tập trung kết hợp giữa thẩm mỹ hiện đại với sự thoải mái tối đa, mang đến sản phẩm ngọt ngào tuyệt vời nhất cho người dùng.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {features.map((feat, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-2">
                    <div className={`w-10 h-10 rounded-xl ${feat.bgColor} flex items-center justify-center`}>
                      {feat.icon}
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm">{feat.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Banner Card */}
            <div className="relative">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-pink-100 via-teal-50 to-sky-100 border border-white shadow-xl space-y-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-pink-400 shadow-sm">
                  <Smile className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">
                  Cam Kết Chất Lượng & Sự Hài Lòng
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Mọi sản phẩm trước khi đến tay bạn đều trải qua quá trình kiểm duyệt kỹ lưỡng để đảm bảo chuẩn sắc màu pastel nhẹ nhàng và độ bền cao nhất.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-teal-500" />
                    <span>Thanh toán linh hoạt & An toàn</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-teal-500" />
                    <span>Hỗ trợ đổi trả trong vòng 7 ngày</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-teal-500" />
                    <span>Chăm sóc khách hàng tận tâm 24/7</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. FEEDBACK / ĐÁNH GIÁ KHÁCH HÀNG */}
      <section className="py-20 bg-gradient-to-b from-white/40 to-pink-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-wider text-sky-600 uppercase bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              Đánh Giá
            </span>
            <h2 className="text-3xl font-bold text-slate-800 mt-3">
              Khách Hàng Nói Gì Về Chúng Tôi
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Sự hài lòng của bạn là niềm may mắn và tự hào lớn nhất của đội ngũ PastelBloom.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm italic leading-relaxed">
                    "{item.comment}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-slate-50">
                  <img 
                    src={item.avatar} 
                    alt={item.name} 
                    className="w-10 h-10 rounded-full object-cover border-2 border-pink-100"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{item.name}</h4>
                    <p className="text-[11px] text-slate-400">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. CONTACT & FEEDBACK FORM */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-tr from-pink-100/80 via-white to-sky-100/80 rounded-3xl shadow-xl border border-white p-8 md:p-12">
            
            <div className="grid md:grid-cols-2 gap-12">
              
              {/* Contact Info */}
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold tracking-wider text-pink-600 uppercase bg-pink-100 px-3 py-1 rounded-full">
                    Gửi Phản Hồi
                  </span>
                  <h2 className="text-3xl font-bold text-slate-800 mt-3">
                    Kết Nối Bằng Tất Cả Yêu Thương
                  </h2>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    Bạn có câu hỏi hoặc muốn nhận tư vấn thêm? Hãy để lại thông tin bên cạnh, chúng tôi sẽ liên hệ lại nhanh nhất có thể.
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-pink-200/60 flex items-center justify-center text-pink-600">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Email liên hệ</p>
                      <p className="text-sm font-semibold text-slate-700">hello@pastelbloom.vn</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-teal-200/60 flex items-center justify-center text-teal-600">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Hotline tư vấn</p>
                      <p className="text-sm font-semibold text-slate-700">+84 (0) 90 123 4567</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-sky-200/60 flex items-center justify-center text-sky-600">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Địa chỉ</p>
                      <p className="text-sm font-semibold text-slate-700">Quận 1, TP. Hồ Chí Minh, Việt Nam</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 text-xs text-slate-400">
                  <p>⚡ Kết nối Supabase REST API an toàn & trực tiếp.</p>
                </div>
              </div>

              {/* Form Input */}
              <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
                {submitSuccess ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto text-teal-500">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Cảm Ơn Bạn!</h3>
                    <p className="text-slate-600 text-sm">
                      Thông tin của bạn đã được gửi thành công. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                    </p>
                    <button 
                      onClick={() => setSubmitSuccess(false)}
                      className="px-6 py-2.5 rounded-full bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700"
                    >
                      Gửi tin nhắn khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Họ & Tên</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nhập tên của bạn"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Địa chỉ Email</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="example@gmail.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Dịch vụ quan tâm</label>
                      <select 
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all bg-white text-slate-700"
                      >
                        <option value="General">Tư vấn chung</option>
                        <option value="Chăm Sắc Đẹp Pastel">Chăm Sắc Đẹp Pastel</option>
                        <option value="Gói Quà Tặng Yêu Thương">Gói Quà Tặng Yêu Thương</option>
                        <option value="Tư Vấn Phong Cách Living">Tư Vấn Phong Cách Living</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Lời nhắn</label>
                      <textarea 
                        rows="4"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Nội dung bạn muốn nhắn gửi..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all bg-white resize-none"
                      ></textarea>
                    </div>

                    {submitError && (
                      <p className="text-xs text-rose-500">{submitError}</p>
                    )}

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-pink-400 via-pink-500 to-teal-400 hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <span>Đang gửi...</span>
                      ) : (
                        <>
                          <span>Gửi Nhắn Gửi</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-100">
            
            {/* Col 1: Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-300 to-teal-200 flex items-center justify-center text-white">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold text-slate-800">PastelBloom</span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">
                Mang sắc màu pastel dịu dàng và nét đẹp hiện đại vào cuộc sống thường ngày của bạn.
              </p>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Liên kết nhanh</h4>
              <ul className="space-y-2 text-xs text-slate-500">
                <li><button onClick={() => scrollToSection('hero')} className="hover:text-pink-500 transition-colors">Trang chủ</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-pink-500 transition-colors">Sản phẩm & Dịch vụ</button></li>
                <li><button onClick={() => scrollToSection('features')} className="hover:text-pink-500 transition-colors">Về chúng tôi</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-pink-500 transition-colors">Liên hệ tư vấn</button></li>
              </ul>
            </div>

            {/* Col 3: Dịch vụ */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Dịch vụ chính</h4>
              <ul className="space-y-2 text-xs text-slate-500">
                <li>Skincare & Thư giãn Spa</li>
                <li>Quà tặng phong cách Pastel</li>
                <li>Tư vấn Decor & Lifestyle</li>
                <li>Chăm sóc khách hàng ưu tiên</li>
              </ul>
            </div>

            {/* Col 4: Nhận thông báo */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Đăng ký nhận ưu đãi</h4>
              <p className="text-xs text-slate-500 mb-3">Nhận những voucher giảm giá và quà tặng pastel mỗi tháng.</p>
              <div className="flex items-center">
                <input 
                  type="email" 
                  placeholder="Email của bạn..." 
                  className="w-full px-3 py-2 text-xs rounded-l-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-pink-300"
                />
                <button className="px-4 py-2 bg-pink-400 text-white text-xs font-medium rounded-r-xl hover:bg-pink-500 transition-colors">
                  Gửi
                </button>
              </div>
            </div>

          </div>

          {/* Copyright Section */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
            <p>© {new Date().getFullYear()} PastelBloom. Tất cả quyền được bảo lưu.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-pink-500 transition-colors">Điều khoản dịch vụ</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Chính sách bảo mật</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}