
<script setup>
definePageMeta({ layout: 'user' })
import { ref } from 'vue'

// Data dummy status inovasi OPD Kota Cilegon
const dataStatusOPD = ref([
	{
		nama: 'Smart Lampu Jalan',
		opd: 'Dinas PU',
		status: 'Ide Baru',
		kategori: 'Teknologi',
		tanggal: '2025-08-01',
		keterangan: 'Menunggu verifikasi dokumen',
	},
	{
		nama: 'Aplikasi Sampah Digital',
		opd: 'DLH',
		status: 'Sedang Proses',
		kategori: 'Lingkungan',
		tanggal: '2025-07-15',
		keterangan: 'Proses validasi lapangan',
	},
	{
		nama: 'E-Perizinan',
		opd: 'Dinas PTSP',
		status: 'Uji Coba',
		kategori: 'Pelayanan Publik',
		tanggal: '2025-07-10',
		keterangan: 'Uji coba sistem',
	},
	{
		nama: 'Sistem Absensi Digital',
		opd: 'BKD',
		status: 'Selesai',
		kategori: 'SDM',
		tanggal: '2025-06-20',
		keterangan: 'Sudah diimplementasikan',
	},
	{
		nama: 'Cilegon Smart City',
		opd: 'Diskominfo',
		status: 'Selesai',
		kategori: 'Teknologi',
		tanggal: '2025-06-01',
		keterangan: 'Sudah diimplementasikan',
	},
	{
		nama: 'Monitoring Air Bersih',
		opd: 'Dinas PU',
		status: 'Sedang Proses',
		kategori: 'Lingkungan',
		tanggal: '2025-05-20',
		keterangan: 'Proses pengadaan alat',
	},
	{
		nama: 'Portal Layanan Publik',
		opd: 'Diskominfo',
		status: 'Uji Coba',
		kategori: 'Pelayanan Publik',
		tanggal: '2025-05-15',
		keterangan: 'Uji coba fitur baru',
	},
	{
		nama: 'Sistem Pengaduan Online',
		opd: 'BKD',
		status: 'Selesai',
		kategori: 'SDM',
		tanggal: '2025-04-10',
		keterangan: 'Sudah diimplementasikan',
	}
])
</script>

<template>
		<div class="max-w-5xl mx-auto mt-8">
			<h1 class="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
				<span>📊</span>
				Status Inovasi OPD Kota Cilegon
			</h1>
			<div class="bg-white rounded-xl shadow-lg p-4">
				<table class="min-w-full table-auto">
					<thead>
						<tr class="bg-blue-100 text-blue-800">
							<th class="px-4 py-2 text-left">Nama Inovasi</th>
							<th class="px-4 py-2 text-left">OPD</th>
							<th class="px-4 py-2 text-left">Status</th>
							<th class="px-4 py-2 text-left">Kategori</th>
							<th class="px-4 py-2 text-left">Tanggal</th>
							<th class="px-4 py-2 text-left">Keterangan</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, idx) in dataStatusOPD" :key="idx" class="border-b">
							<td class="px-4 py-2">{{ item.nama }}</td>
							<td class="px-4 py-2 font-semibold text-green-700">{{ item.opd }}</td>
							<td class="px-4 py-2">
								<span :class="{
									'bg-blue-200 text-blue-800 px-2 py-1 rounded-lg': item.status === 'Ide Baru',
									'bg-yellow-200 text-yellow-800 px-2 py-1 rounded-lg': item.status === 'Sedang Proses',
									'bg-purple-200 text-purple-800 px-2 py-1 rounded-lg': item.status === 'Uji Coba',
									'bg-green-200 text-green-800 px-2 py-1 rounded-lg': item.status === 'Selesai',
								}">{{ item.status }}</span>
							</td>
							<td class="px-4 py-2">{{ item.kategori }}</td>
							<td class="px-4 py-2">{{ item.tanggal }}</td>
							<td class="px-4 py-2">{{ item.keterangan }}</td>
						</tr>
						<tr v-if="dataStatusOPD.length === 0">
							<td colspan="6" class="text-center text-gray-400 py-6">Belum ada data status inovasi OPD</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
</template>
