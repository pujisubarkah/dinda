<template>
  <footer class="py-12" style="background: linear-gradient(135deg, #20B2AA 0%, #20B2AA 100%);">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Logo & Brand -->
        <div class="flex flex-col items-center lg:items-start">
          <img src="https://cilegon.go.id/assets/images/logokotacilegon.png" alt="Logo Kota Cilegon" class="w-20 mb-4" />
          <h1 class="text-2xl font-bold uppercase tracking-wide text-white mb-1" style="text-shadow: 1px 1px 2px rgba(128, 128, 128, 0.8);">DINDA CILEGON</h1>
          <h2 class="text-lg font-semibold text-gray-100 mb-2" style="text-shadow: 1px 1px 2px rgba(128, 128, 128, 0.8);">Dashboard Inovasi Daerah</h2>
          <p class="text-sm text-gray-200 text-center lg:text-left italic mb-4" style="text-shadow: 1px 1px 1px rgba(128, 128, 128, 0.5);">
            Wahana Informasi & Akselerasi Inovasi Kota Cilegon
          </p>
        </div>

        <!-- Contact Info -->
        <div class="text-center lg:text-left">
          <h3 class="text-lg font-semibold text-white mb-4" style="text-shadow: 1px 1px 2px rgba(128, 128, 128, 0.8);">Kontak Kami</h3>
          <div class="space-y-3 text-gray-200">
            <div class="flex items-center justify-center lg:justify-start">
              <i class="fas fa-map-marker-alt w-5 text-center mr-3"></i>
              <span class="text-sm" style="text-shadow: 1px 1px 1px rgba(128, 128, 128, 0.5);">
                Jl. Raya Merak-Tirtayasa No.11<br>
                Ramanuju, Kec. Purwakarta<br>
                Kota Cilegon, Banten 42117
              </span>
            </div>
            <div class="flex items-center justify-center lg:justify-start">
              <i class="fas fa-phone w-5 text-center mr-3"></i>
              <a href="tel:+622547354321" class="text-sm hover:text-white transition-colors" style="text-shadow: 1px 1px 1px rgba(128, 128, 128, 0.5);">
                (0254) 735-4321
              </a>
            </div>
            <div class="flex items-center justify-center lg:justify-start">
              <i class="fas fa-envelope w-5 text-center mr-3"></i>
              <a href="mailto:dinda@cilegon.go.id" class="text-sm hover:text-white transition-colors" style="text-shadow: 1px 1px 1px rgba(128, 128, 128, 0.5);">
                dinda@cilegon.go.id
              </a>
            </div>
            <div class="flex items-center justify-center lg:justify-start">
              <i class="fas fa-globe w-5 text-center mr-3"></i>
              <a href="https://cilegon.go.id" target="_blank" class="text-sm hover:text-white transition-colors" style="text-shadow: 1px 1px 1px rgba(128, 128, 128, 0.5);">
                www.cilegon.go.id
              </a>
            </div>
          </div>
        </div>

        <!-- Social Media & Quick Links -->
        <div class="text-center lg:text-left">
          <h3 class="text-lg font-semibold text-white mb-4" style="text-shadow: 1px 1px 2px rgba(128, 128, 128, 0.8);">Ikuti Kami</h3>
          <div class="flex justify-center lg:justify-start gap-4 mb-6">
            <a href="https://www.facebook.com/portal.cilegon.7" target="_blank" class="bg-white/20 p-3 rounded-full text-white hover:bg-white/30 hover:scale-110 transition-all duration-200">
              <i class="fab fa-facebook-f text-lg"></i>
            </a>
            <a href="https://twitter.com/pemkotcilegon" target="_blank" class="bg-white/20 p-3 rounded-full text-white hover:bg-white/30 hover:scale-110 transition-all duration-200">
              <i class="fab fa-twitter text-lg"></i>
            </a>
            <a href="https://www.youtube.com/channel/UCuksmrFzRoe9nxAilA95EUA" target="_blank" class="bg-white/20 p-3 rounded-full text-white hover:bg-white/30 hover:scale-110 transition-all duration-200">
              <i class="fab fa-youtube text-lg"></i>
            </a>
            <a href="https://www.instagram.com/pemkotcilegon" target="_blank" class="bg-white/20 p-3 rounded-full text-white hover:bg-white/30 hover:scale-110 transition-all duration-200">
              <i class="fab fa-instagram text-lg"></i>
            </a>
          </div>
          
          <!-- Quick Links -->
          <div class="space-y-2 text-sm">
            <h4 class="font-semibold text-white mb-3" style="text-shadow: 1px 1px 2px rgba(128, 128, 128, 0.8);">Layanan</h4>
            <div class="text-gray-200">
              <a href="/galeri" class="block hover:text-white transition-colors mb-1" style="text-shadow: 1px 1px 1px rgba(128, 128, 128, 0.5);">Galeri Inovasi</a>
              <a href="/inovasi" class="block hover:text-white transition-colors mb-1" style="text-shadow: 1px 1px 1px rgba(128, 128, 128, 0.5);">Ide Inovasi</a>
              <a href="/lomba" class="block hover:text-white transition-colors mb-1" style="text-shadow: 1px 1px 1px rgba(128, 128, 128, 0.5);">Lomba Inovasi</a>
              <a href="/forum" class="block hover:text-white transition-colors" style="text-shadow: 1px 1px 1px rgba(128, 128, 128, 0.5);">Forum Diskusi</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-white/20 mt-8 pt-6 text-center">
        <p class="text-gray-200 text-sm" style="text-shadow: 1px 1px 1px rgba(128, 128, 128, 0.5);">
          © 2024 Pemerintah Kota Cilegon. Hak cipta dilindungi undang-undang.
        </p>
      </div>
    </div>
  </footer>
</template>
