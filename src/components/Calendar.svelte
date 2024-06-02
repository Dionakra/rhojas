<script lang="ts">
	import type { Day, EventType, Month } from "$lib/models/Calendar";
	import { eventTypes, type EventTypeUI } from "$lib/utils/EventTypeStyle";
	import CalendarService from "$lib/services/CalendarService";
	import { getMonthName } from "$lib/Utils";
	import type { TouchEventHandler } from "svelte/elements";

	// Props
	export let month: Month;

	//  Instantiation
	const calendarService: CalendarService = new CalendarService();
	const events: EventTypeUI[] = eventTypes();
	let today = new Date();
	let monthName = getMonthName(month.number);

	// Editing data
	let showModal = false;
	let startEditingDay: number | undefined = undefined;
	let endEditingDay: number | undefined = undefined;
	let selectedEventType: EventType | undefined = undefined;

	// Style
	function isToday(month: Month, day: Day): boolean {
		return (
			month.number == today.getMonth() &&
			day.number == today.getDate() &&
			month.year == today.getFullYear()
		);
	}

	function getEventTypeUI(eventType: EventType): EventTypeUI {
		return events.find((e) => e.event == eventType) || events[0];
	}

	// Action
	function hideModal() {
		showModal = false;
		startEditingDay = undefined;
		endEditingDay = undefined;
		selectedEventType = undefined;
	}

	function startDragging(
		day: Day,
		e: PointerEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		},
	) {
		e.currentTarget.releasePointerCapture(e.pointerId);

		//e.releasePointerCapture(a.pointerId);
		if (day) startEditingDay = day.number;
	}

	function whileDragging(day: Day) {
		if (day) endEditingDay = day.number;
	}

	function stopDragging(day: Day) {
		if (day && startEditingDay) {
			if (day.number < startEditingDay) {
				endEditingDay = startEditingDay;
				startEditingDay = day.number;
			} else {
				endEditingDay = day.number;
			}

			showModal = true;
		}
	}

	function setActivityForDays() {
		if (!startEditingDay || !endEditingDay || !selectedEventType) {
			hideModal();
			return;
		}
		for (let week of month.weeks) {
			for (let day of week.days) {
				if (
					day &&
					day.number >= startEditingDay &&
					day.number <= endEditingDay
				) {
					day.eventType = selectedEventType;
				}
			}
		}
		month = month;
		calendarService.storeMonth(month);
		hideModal();
	}
</script>

<div class="bg-white border-gray-100 shadow-lg rounded-lg shadow-gray-400 mt-4">
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

	<div class="grid grid-cols-7 touch-none">
		{#each month.weeks as week, weekNumber}
			{#each week.days as day, dayNumber}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-interactive-supports-focus -->
				{#if day}
					<div
						role="button"
						class:bg-pink-100={startEditingDay &&
							endEditingDay &&
							((day.number >= startEditingDay &&
								day.number <= endEditingDay) ||
								(day.number <= startEditingDay &&
									day.number >= endEditingDay))}
						on:pointerdown={(e) => startDragging(day, e)}
						on:pointerup={() => stopDragging(day)}
						on:pointermove={() => whileDragging(day)}
						class:rounded-bl-lg={weekNumber ==
							month.weeks.length - 1 && dayNumber == 0}
						class:rounded-br-lg={weekNumber ==
							month.weeks.length - 1 && dayNumber == 6}
						class="{getEventTypeUI(day.eventType).background} 
				 select-none cursor-pointer h-24"
					>
						<p
							class="{isToday(month, day)
								? 'bg-white rounded-full py-1 px-3 shadow-md aspect-square w-fit'
								: 'text-center'} mx-auto"
						>
							{day.number}
						</p>
					</div>
				{:else}
					<div class="h-24"></div>
				{/if}
			{/each}
		{/each}
	</div>
	<!-- END CALENDAR -->

	<!-- MODAL DE EDICION-->
	<div class:hidden={!showModal} class="relative z-10">
		<div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

		<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
			<div
				class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
			>
				<div
					class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
				>
					<div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
						<div class="">
							<div
								class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left"
							>
								<h3
									class="text-xl font-semibold leading-6 text-gray-900"
									id="modal-title"
								>
									Del {startEditingDay} al {endEditingDay}
									de {monthName}
								</h3>
								<div
									class="mt-4 grid grid-cols-2 gap-x-6 gap-y-2"
								>
									{#each events as eventType}
										<button
											class:ring-4={selectedEventType ==
												eventType.event}
											class="{[
												eventType.background,
												eventType.text,
												eventType.shadow,
												eventType.ring,
											].join(' ')} 


									text-left font-semibold
									w-full px-2 py-1 my-1 rounded-md shadow-sm"
											on:click={() =>
												(selectedEventType =
													eventType.event)}
										>
											{eventType.event}
										</button>
									{/each}
								</div>
							</div>
						</div>
					</div>
					<div
						class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
					>
						<button
							type="button"
							on:click={() => setActivityForDays()}
							class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
							>Guardar</button
						>
						<button
							type="button"
							on:click={() => hideModal()}
							class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
							>Cancelar</button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
