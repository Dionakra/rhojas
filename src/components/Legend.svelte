<script lang="ts">
	import { eventTypes, type EventTypeUI } from "$lib/utils/EventTypeStyle";
	const events: EventTypeUI[] = eventTypes();
</script>

<div
	class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 flex-wrap gap-2 mt-4"
>
	{#each events as eventType}
		<button
			class="{[
				eventType.background,
				eventType.text,
				eventType.shadow,
			].join(
				' ',
			)} flex text-left w-full py-1 rounded-md shadow-md text-sm font-semibold"
		>
			<img
				src={`/${eventType.icon}`}
				alt={eventType.event}
				class="h-6 pl-2"
			/>
			<p class="px-1 my-auto">{eventType.event}</p>
		</button>
	{/each}
</div>
