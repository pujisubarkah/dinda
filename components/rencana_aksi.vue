
<template>
	<form @submit.prevent="handleSubmit" class="p-0 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl shadow-2xl max-w-2xl mx-auto max-h-[90vh] overflow-y-auto border border-blue-100">
		<!-- Header -->
		<div class="flex items-center gap-3 px-8 py-6 bg-gradient-to-r from-teal-500 to-blue-600 rounded-t-2xl">
			<svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2a4 4 0 014-4h2a4 4 0 014 4v2M9 7h.01M15 7h.01M12 7h.01" />
			</svg>
			<div>
				<h2 class="text-2xl font-bold text-white mb-0">Form Rencana Aksi</h2>
				<p class="text-white text-sm opacity-80">Lengkapi detail rencana aksi inovasi Anda</p>
			</div>
		</div>
		<div class="flex flex-col gap-6 px-8 py-8">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label class="block font-semibold mb-1">Judul Aksi <span class="text-red-500">*</span></label>
					<input v-model="form.judulAksi" type="text" class="input input-bordered w-full focus:ring-2 focus:ring-teal-400" required placeholder="Judul aksi inovasi..." />
				</div>
				<div>
					<label class="block font-semibold mb-1">Jenis Periode</label>
					<select v-model="form.jenisPeriode" class="input input-bordered w-full focus:ring-2 focus:ring-teal-400">
						<option value="">Pilih Periode</option>
						<option value="bulanan">Bulanan</option>
						<option value="tahunan">Tahunan</option>
					</select>
				</div>
				<div>
					<label class="block font-semibold mb-1">Periode Mulai</label>
					<input v-model="form.periodeMulai" type="date" class="input input-bordered w-full focus:ring-2 focus:ring-teal-400" />
				</div>
				<div>
					<label class="block font-semibold mb-1">Periode Selesai</label>
					<input v-model="form.periodeSelesai" type="date" class="input input-bordered w-full focus:ring-2 focus:ring-teal-400" />
				</div>
				<div class="md:col-span-2">
					<label class="block font-semibold mb-1">Deskripsi Aksi</label>
					<textarea v-model="form.deskripsiAksi" class="textarea textarea-bordered w-full focus:ring-2 focus:ring-teal-400" rows="2" placeholder="Deskripsi singkat rencana aksi..."></textarea>
				</div>
				<div class="md:col-span-2">
					<label class="block font-semibold mb-1">Target Capaian</label>
					<textarea v-model="form.targetCapaian" class="textarea textarea-bordered w-full focus:ring-2 focus:ring-teal-400" rows="2" placeholder="Target capaian yang ingin dicapai..."></textarea>
				</div>
				<div class="md:col-span-2">
					<label class="block font-semibold mb-1">Indikator Keberhasilan</label>
					<textarea v-model="form.indikatorKeberhasilan" class="textarea textarea-bordered w-full focus:ring-2 focus:ring-teal-400" rows="2" placeholder="Indikator keberhasilan rencana aksi..."></textarea>
				</div>
				<div>
					<label class="block font-semibold mb-1">Anggaran</label>
					<input v-model.number="form.anggaran" type="number" class="input input-bordered w-full focus:ring-2 focus:ring-teal-400" min="0" placeholder="Rp" />
				</div>
						<div>
							<label class="block font-semibold mb-1">Status</label>
							<select v-model="form.status" class="input input-bordered w-full focus:ring-2 focus:ring-teal-400">
								<option value="">Pilih Status</option>
								<option value="Tahap Persiapan">Tahap Persiapan</option>
								<option value="Tahapan Pelaksanaan">Tahapan Pelaksanaan</option>
								<option value="Tahap Monitoring dan Evaluasi">Tahap Monitoring dan Evaluasi</option>
							</select>
						</div>
				<div>
					<label class="block font-semibold mb-1">Progress (%)</label>
					<input v-model.number="form.progressPercentage" type="number" class="input input-bordered w-full focus:ring-2 focus:ring-teal-400" min="0" max="100" placeholder="0-100" />
				</div>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div class="md:col-span-2">
					<label class="block font-semibold mb-1">Catatan Pelaksanaan</label>
					<textarea v-model="form.catatanPelaksanaan" class="textarea textarea-bordered w-full focus:ring-2 focus:ring-teal-400" rows="2" placeholder="Catatan pelaksanaan..." />
				</div>
				<div>
					<label class="block font-semibold mb-1">Hambatan</label>
					<textarea v-model="form.hambatan" class="textarea textarea-bordered w-full focus:ring-2 focus:ring-teal-400" rows="2" placeholder="Hambatan yang dihadapi..." />
				</div>
				<div>
					<label class="block font-semibold mb-1">Solusi</label>
					<textarea v-model="form.solusi" class="textarea textarea-bordered w-full focus:ring-2 focus:ring-teal-400" rows="2" placeholder="Solusi atas hambatan..."></textarea>
				</div>
			</div>
			<div class="flex justify-end gap-3 mt-8">
				<button type="button" class="btn btn-secondary" @click="resetForm">Reset</button>
				<button type="submit" class="btn btn-primary flex items-center gap-2">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
					Simpan
				</button>
			</div>
			<div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
			<div v-if="success" class="text-green-600 mt-2">{{ success }}</div>
		</div>
	</form>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

// Terima PIC Pelaksana dan id ide inovasi dari parent
const props = defineProps<{ picPelaksana: string; ideInovasiId: string | number }>();

const form = ref({
	ideInovasiId: props.ideInovasiId ?? undefined,
	picPelaksana: props.picPelaksana ?? '',
	judulAksi: '',
	deskripsiAksi: '',
	jenisPeriode: '',
	periodeMulai: '',
	periodeSelesai: '',
	targetCapaian: '',
	indikatorKeberhasilan: '',
	anggaran: undefined,
	status: '',
	progressPercentage: undefined,
	catatanPelaksanaan: '',
	hambatan: '',
	solusi: '',
});
const error = ref('');
const success = ref('');

// Set default PIC Pelaksana dan ideInovasiId dari props saat mount/props berubah
onMounted(() => {
	if (props.picPelaksana) form.value.picPelaksana = props.picPelaksana;
	if (props.ideInovasiId) form.value.ideInovasiId = props.ideInovasiId;
});
watch(() => props.picPelaksana, (val) => {
	if (val) form.value.picPelaksana = val;
});
watch(() => props.ideInovasiId, (val) => {
	if (val) form.value.ideInovasiId = val;
});

	form.value = {
		ideInovasiId: props.ideInovasiId ?? undefined,
		picPelaksana: props.picPelaksana ?? '',
		judulAksi: '',
		deskripsiAksi: '',
		jenisPeriode: '',
		periodeMulai: '',
		periodeSelesai: '',
		targetCapaian: '',
		indikatorKeberhasilan: '',
		anggaran: undefined,
		status: '',
		progressPercentage: undefined,
		catatanPelaksanaan: '',
		hambatan: '',
		solusi: '',
	};
	error.value = '';
	success.value = '';

async function handleSubmit() {
	error.value = '';
	success.value = '';
	if (!form.value.ideInovasiId || !form.value.judulAksi) {
		error.value = 'ideInovasiId dan judulAksi wajib diisi';
		return;
	}
	try {
		const res = await $fetch('/api/rencana_aksi', {
			method: 'POST',
			body: form.value,
		});
		if (res.success) {
			success.value = 'Rencana aksi berhasil disimpan';
			resetForm();
		} else {
			error.value = (res as any).error || (res as any).message || 'Gagal menyimpan rencana aksi';
		}
	} catch (e: any) {
		error.value = e?.data?.statusMessage || e.message || 'Gagal menyimpan rencana aksi';
	}
}

// Tambahkan fungsi resetForm
function resetForm() {
	form.value = {
		ideInovasiId: props.ideInovasiId ?? undefined,
		picPelaksana: props.picPelaksana ?? '',
		judulAksi: '',
		deskripsiAksi: '',
		jenisPeriode: '',
		periodeMulai: '',
		periodeSelesai: '',
		targetCapaian: '',
		indikatorKeberhasilan: '',
		anggaran: undefined,
		status: '',
		progressPercentage: undefined,
		catatanPelaksanaan: '',
		hambatan: '',
		solusi: '',
	};
	error.value = '';
	success.value = '';
}
</script>

<style scoped>
.input, .textarea {
	border: 1px solid #d1d5db; /* Tailwind border */
	border-radius: 0.25rem;    /* Tailwind rounded */
	padding-left: 0.5rem;      /* Tailwind px-2 */
	padding-right: 0.5rem;
	padding-top: 0.25rem;      /* Tailwind py-1 */
	padding-bottom: 0.25rem;
}
.btn {
	padding-left: 1rem;        /* Tailwind px-4 */
	padding-right: 1rem;
	padding-top: 0.5rem;       /* Tailwind py-2 */
	padding-bottom: 0.5rem;
	border-radius: 0.25rem;    /* Tailwind rounded */
	font-weight: 600;          /* Tailwind font-semibold */
}
.btn-primary {
	background-color: #2563eb; /* Tailwind bg-blue-600 */
	color: #fff;               /* Tailwind text-white */
}
.btn-primary:hover {
	background-color: #1d4ed8; /* Tailwind hover:bg-blue-700 */
}
.btn-secondary {
	background-color: #e5e7eb; /* Tailwind bg-gray-200 */
	color: #374151;            /* Tailwind text-gray-700 */
}
.btn-secondary:hover {
	background-color: #d1d5db; /* Tailwind hover:bg-gray-300 */
}
</style>
