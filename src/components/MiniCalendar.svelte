<script lang="ts">
	import type { EventType, Month } from "$lib/models/Calendar";
	import { eventTypes, type EventTypeUI } from "$lib/utils/EventTypeStyle";
	import { getMonthName } from "$lib/Utils";

	// Props
	export let month: Month;
	$: monthName = getMonthName(month.number);

	//  Instantiation
	const events: EventTypeUI[] = eventTypes();

	function getEventTypeUI(eventType: EventType): EventTypeUI {
		return events.find((e) => e.event == eventType) || events[0];
	}
</script>

<div title="Ir a {monthName} {month.year}">
	<p class=" w-full text-center my-2 text-sm">
		{monthName}
		{month.year}
	</p>
	<div
		class="hidden md:block bg-white border-gray-100 shadow-md rounded-lg shadow-gray-300 text-xs"
	>
		<div
			class="border-b border-gray-100 w-full grid grid-cols-7 py-2 text-center font-semibold"
		>
			<div>L</div>
			<div>M</div>
			<div>X</div>
			<div>J</div>
			<div>V</div>
			<div>S</div>
			<div>D</div>
		</div>

		<div class="grid grid-cols-7 text-center">
			{#each month.weeks as week, weekNumber}
				{#each week.days as day, dayNumber}
					{#if day}
						<div
							class:rounded-bl-lg={weekNumber ==
								month.weeks.length - 1 && dayNumber == 0}
							class:rounded-br-lg={weekNumber ==
								month.weeks.length - 1 && dayNumber == 6}
							class="{getEventTypeUI(day.eventType)
								.background} aspect-square"
						>
							<p>
								{day.number}
							</p>
						</div>
					{:else}
						<div class=" aspect-square"></div>
					{/if}
				{/each}
			{/each}
		</div>
	</div>
</div>
