<script lang="ts">
	import { EventType, type Month, type Day } from "$lib/models/Calendar";
	import SalaryService from "$lib/services/SalaryService";
	import CalendarService from "$lib/services/CalendarService";

	const calendarService: CalendarService = new CalendarService();

	export let month: Month;

	type SalaryConcept = {
		days: number;
		amount: number;
		total: number;
	};

	// Calculate $$$
	type SalarySummary = {
		total: number;
		monthly: number;
		baseNational: SalaryConcept;
		fireNational: SalaryConcept;
		baseInternational: SalaryConcept;
		fireInternational: SalaryConcept;
	};

	const salaryService = new SalaryService();
	function getSalarySummary(month: Month): SalarySummary {
		const previous = calendarService.getPreviousMonth(
			month.year,
			month.number,
		);
		const next = calendarService.getNextMonth(month.year, month.number);
		const salary = salaryService.getSalary();
		const salarySummary: SalarySummary = {
			total: salary.monthly,
			monthly: salary.monthly,
			baseNational: {
				days: 0,
				amount: 0,
				total: 0,
			},
			fireNational: {
				days: 0,
				amount: 0,
				total: 0,
			},
			baseInternational: {
				days: 0,
				amount: 0,
				total: 0,
			},
			fireInternational: {
				days: 0,
				amount: 0,
				total: 0,
			},
		};

		// Calculate Fire pluses
		let days: Day[] = previous.weeks
			.flatMap((w) => w.days)
			.filter(
				(d) =>
					d &&
					[
						EventType.BASE_INTERNATIONAL,
						EventType.BASE_NATIONAL,
					].includes(d.eventType),
			);

		for (let day of days) {
			if (day.eventType == EventType.BASE_NATIONAL) {
				salarySummary.fireNational.amount = salary.fireNational;
				salarySummary.fireNational.days++;
				salarySummary.fireNational.total += salary.fireNational;
			} else if (day.eventType == EventType.BASE_INTERNATIONAL) {
				salarySummary.fireInternational.amount =
					salary.fireInternational;
				salarySummary.fireInternational.days++;
				salarySummary.fireInternational.total +=
					salary.fireInternational;
			}
		}

		// Calculate Base pluses
		days = next.weeks
			.flatMap((w) => w.days)
			.filter(
				(d) =>
					d &&
					![EventType.REGULAR, EventType.FREE].includes(d.eventType),
			);

		for (let day of days) {
			if (
				[EventType.BASE_NATIONAL, EventType.TRANSIT_NATIONAL].includes(
					day.eventType,
				)
			) {
				salarySummary.baseNational.amount = salary.baseNational;
				salarySummary.baseNational.days++;
				salarySummary.baseNational.total += salary.baseNational;
			} else if (
				[
					EventType.BASE_INTERNATIONAL,
					EventType.TRANSIT_INTERNATIONAL,
				].includes(day.eventType)
			) {
				salarySummary.baseInternational.amount =
					salary.baseInternational;
				salarySummary.baseInternational.days++;
				salarySummary.baseInternational.total +=
					salary.baseInternational;
			}
		}

		salarySummary.total +=
			salarySummary.baseInternational.total +
			salarySummary.baseNational.total +
			salarySummary.fireInternational.total +
			salarySummary.fireNational.total;

		return salarySummary;
	}

	$: salarySummary = getSalarySummary(month);
</script>

<!-- SUMMARY -->
<div class="">
	<p class="text-lg lg:text-3xl font-semibold">
		Salario: <span class="text-green-600">{salarySummary.total} €</span>
	</p>

	<p class="lg:text-lg font-semibold">
		Base Mensual: <span class="text-green-600"
			>{salarySummary.monthly} €</span
		>
	</p>

	<p class="lg:text-lg font-semibold">
		Base Nacional: <span class="text-green-600"
			>{salarySummary.baseNational.total} €</span
		>
		<span class="text-xs text-gray-700 font-normal"
			>({salarySummary.baseNational.amount} x {salarySummary.baseNational
				.days} dias)</span
		>
	</p>

	<p class="pl-4 lg:text-lg font-semibold">
		Plus Incendios: <span class="text-green-600"
			>{salarySummary.fireNational.total} €</span
		>
		<span class="text-xs text-gray-700 font-normal"
			>({salarySummary.fireNational.amount} x {salarySummary.fireNational
				.days} dias)</span
		>
	</p>

	<p class="lg:text-lg font-semibold">
		Base Internacional: <span class="text-green-600"
			>{salarySummary.baseInternational.total} €</span
		>
		<span class="text-xs text-gray-700 font-normal">
			({salarySummary.baseInternational.amount} x {salarySummary
				.baseInternational.days} dias)</span
		>
	</p>

	<p class="pl-4 lg:text-lg font-semibold">
		Plus Incendios: <span class="text-green-600"
			>{salarySummary.fireInternational.total} €</span
		>
		<span class="text-xs text-gray-700 font-normal">
			({salarySummary.fireInternational.amount} x {salarySummary
				.fireInternational.days} dias)</span
		>
	</p>
</div>

<!-- END SUMMARY -->
