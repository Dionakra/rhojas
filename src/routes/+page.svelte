<script lang="ts">
	// Imports
	import { type Month } from "$lib/models/Calendar";
	import CalendarService from "$lib/services/CalendarService";
	import { getMonthName } from "$lib/Utils";

	// Components
	import Calendar from "../components/Calendar.svelte";
	import Legend from "../components/Legend.svelte";
	import SalarySummary from "../components/SalarySummary.svelte";
	import MiniCalendar from "../components/MiniCalendar.svelte";

	// Loading data
	const date = new Date();
	const calendarService: CalendarService = new CalendarService();
	let month: Month = calendarService.getMonth(
		date.getFullYear(),
		date.getMonth(),
	);
	$: monthName = getMonthName(month.number);
	$: nextMonth = calendarService.getNextMonth(month.year, month.number);
	$: previousMonth = calendarService.getPreviousMonth(
		month.year,
		month.number,
	);

	function goToPreviousMonth() {
		month = calendarService.getPreviousMonth(month.year, month.number);
	}

	function goToNextMonth() {
		month = calendarService.getNextMonth(month.year, month.number);
	}
</script>

<svelte:head>
	<title>Rhojas' App</title>
	<meta name="description" content="Aplicación para gestión de destinos" />
</svelte:head>

<section class="bg-gray-50 h-screen">
	<div class=" md:container mx-auto">
		<div class="flex pt-6">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="w-1/6 cursor-pointer relative"
				on:click={() => goToPreviousMonth()}
			>
				<div class="absolute inset-x-0 bottom-0">
					<MiniCalendar month={previousMonth} />
				</div>
			</div>

			<div class="w-4/6 mx-auto text-center">
				<p class="text-xl lg:text-4xl w-full text-center my-2">
					{monthName}
					{month.year}
				</p>
				<SalarySummary {month} />
			</div>

			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="w-1/6 cursor-pointer relative"
				on:click={() => goToNextMonth()}
			>
				<div class="absolute inset-x-0 bottom-0">
					<MiniCalendar month={nextMonth} />
				</div>
			</div>
		</div>

		<Calendar {month} />
		<Legend />
	</div>
</section>
