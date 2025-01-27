<script>
	import { beforeNavigate } from '$app/navigation';
	import { logout } from '$lib/pocketbase.svelte.js';
	import IconMenu from '$lib/components/icons/iconMenu.svelte';
	import { goto } from '$app/navigation';
	import UserIcon from '$lib/components/icons/user.svelte';
	import Menu from '$lib/components/icons/iconMenu.svelte';
	import HomeIcon from '$lib/components/icons/home.svelte';
	import ImageIcon from '$lib/components/icons/iconImage.svelte';
	import SocketIcon from '$lib/components/icons/socket.svelte';
	import PlusIcon from '$lib/components/icons/iconPlus.svelte';
	import CatIcon from '$lib/components/icons/iconCategorySearch.svelte';
	import TypeIcon from '$lib/components/icons/iconTypeog.svelte';

	let showDropdown = $state(false); // Dropdown visibility state
	let showSideMenu = $state(false); // Side menu visibility state
	let username = 'bertie';

	const handleLogout = () => {
		logout();
		showDropdown = false;
		goto('/plugin');
	};

	const toggleDropdown = () => {
		showDropdown = !showDropdown;
	};

	const toggleSideMenu = () => {
		showSideMenu = !showSideMenu;
	};
	const closeSideMenu = () => {
		showSideMenu = false;
	};
	// Hook to close the sidebar just before navigation
	beforeNavigate(() => {
		closeSideMenu();
	});
</script>

<!-- Backdrop -->
{#if showSideMenu}
	<div class="backdrop" onclick={closeSideMenu} aria-hidden="true"></div>
{/if}

<nav class="content -horiz">
	<div class="nav-left">
		<button class="-p-x" onclick={toggleSideMenu} aria-label="Toggle Side Menu">
			<Menu />
		</button>
		<a class="-p-x" href="/socket/dashboard" aria-label="Go to Dashboard">
			<HomeIcon />
		</a>
		<a class="-p-x" href="/socket/images" aria-label="Go to images">
			<ImageIcon />
		</a>
		<a class="-p-x" href="/socket/ui" aria-label="Go to images"> UI </a>
	</div>

	<div class="nav-right -txt-white">
		<div class="-p-x"><a href="/posts/new">+ Create</a></div>
		<button
			class="user-icon"
			onclick={toggleDropdown}
			aria-expanded={showDropdown}
			aria-label="User menu"
		>
			<UserIcon />
		</button>
		<span class="username">{username}</span>
		{#if showDropdown}
			<div class="dropdown" role="menu">
				<button onclick={handleLogout} role="menuitem">Logout</button>
				<a href="/" role="menuitem">Login</a>
			</div>
		{/if}
	</div>
</nav>

<nav class="-side-menu {showSideMenu ? 'open' : ''} relative -vertical bg-dark -txt-white -m-y -p">
	<div class="-right">
		<button onclick={toggleSideMenu} aria-label="Close Side Menu">X</button>
	</div>
	<header>
		<h4 class="-txt-white">Admin</h4>
	</header>
	<ul class="-txt-white -p">
		<li>
			<a href="/"><HomeIcon />Home</a>
		</li>
		<li><a href="/"><PlusIcon /> New Post</a></li>
		<li><a href="/"><ImageIcon />Images</a></li>
		<li><a href="/"><CatIcon />Categories</a></li>
	</ul>

	<header>
		<h4 class="-txt-white">Design</h4>
	</header>
	<ul class="-txt-white -p">
		<li><a href="/socket/ui"><TypeIcon></TypeIcon> Typography</a></li>
	</ul>
	<header>
		<h4 class="-txt-white">User</h4>
	</header>
	<ul class="-txt-white -p">
		<li><a href="/plugin/">Plugin</a></li>
	</ul>
</nav>

<style>
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
		z-index: 50; /* Behind the side menu */
	}

	.-side-menu {
		z-index: 100; /* Above the backdrop */
	}

	.-side-menu.open {
		transform: translateX(0px); /* Make sure this is defined */
	}
	nav {
		display: flex;
		flex-wrap: wrap;
	}
	nav.-horiz {
		justify-content: space-between;
		align-items: center;
		background-color: #333;
		color: white;
		padding: 0px 2em;
		position: fixed;
		width: 100%;
		z-index: 99;
		flex-wrap: wrap;
	}

	nav.-vertical {
		flex-direction: column;
		position: fixed;
		top: -20px;
		transform: translateX(-350px); /* Slide into view */
		width: 350px;
		height: 100%;
		padding: 1em 0;
		transition: transform 0.3s ease;
		z-index: 100;
	}

	.-side-menu.open {
		transform: translateX(0px); /* Slide into view */
	}

	nav.-vertical ul {
		width: 100%;
		padding: 1em 0.25em;
	}

	nav.-vertical ul li a {
		display: flex;
		width: 100%;
		padding: 0.25em 0.5em;
		align-items: center;
		gap: 1em;
	}

	nav.-vertical ul li a:hover {
		background-color: white;
		color: #333;
	}

	.-right {
		position: absolute;
		top: 4px;
		right: 1em;
	}

	.dropdown {
		position: absolute;
		top: 100%; /* Position below the user icon */
		right: 0;
		background-color: #444;
		color: white;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		margin-top: 8px;
		z-index: 10;
	}

	.dropdown button,
	.dropdown a {
		display: block;
		width: 100%;
		padding: 8px 16px;
		background: none;
		border: none;
		text-align: left;
		font-size: 1rem;
		color: white;
		cursor: pointer;
		text-decoration: none;
	}

	.dropdown button:hover,
	.dropdown a:hover {
		background-color: #555;
	}

	.nav-left {
		font-size: 1.2rem;
		display: flex;
		align-items: flex-start;
		justify-items: center;
	}

	.nav-right {
		display: flex;
		align-items: center;
		gap: 12px;
		position: relative; /* For dropdown positioning */
	}

	.user-icon {
		width: 32px;
		height: 32px;
		background-color: white;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #333;
		font-size: 1.2rem;
		cursor: pointer;
		position: relative;
		border: none;
	}

	.user-icon:hover {
		background-color: #ddd;
	}

	.username {
		font-size: 1rem;
		color: white;
	}

	.dropdown {
		position: absolute;
		top: 100%; /* Position below the user icon */
		right: 0;
		background-color: #444;
		color: white;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		margin-top: 8px;
		z-index: 10;
	}

	.dropdown button,
	.dropdown a {
		display: block;
		width: 100%;
		padding: 8px 16px;
		background: none;
		border: none;
		text-align: left;
		font-size: 1rem;
		color: white;
		cursor: pointer;
		text-decoration: none;
	}

	.dropdown button:hover,
	.dropdown a:hover {
		background-color: #555;
	}

	/* Other existing styles remain unchanged */
</style>
