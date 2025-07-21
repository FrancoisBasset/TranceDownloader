<template>
	<div class="modal">
		<div class="overlay" @click="$emit('onClose')"></div>

		<div class="modal-body">
			<slot></slot>
		</div>
	</div>
</template>
