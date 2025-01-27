<script>
	import Home from '$lib/components/icons/home.svelte';
	import IconImage from '$lib/components/icons/IconImage.svelte';
	import PostCard from '$lib/components/postCard.svelte';
	import IconMenu from '$lib/components/icons/iconMenu.svelte';
	import Nav from '$lib/components/navs/apNav.svelte';
	const cardData = {
		id: '12345',
		title: 'A Tale of Adventure',
		excerpt: 'Discover the exciting story of courage and friendship in a world of wonders.',
		expand: {
			featuredImage: {
				id: 'so422g693714qzm',
				image: 'beauty_beast_crane_800_600x322_pdny9fv3sm.jpg',
				alt: 'A beautiful illustration of Beauty and the Beast'
			}
		}
	};
</script>

<div class="hero">
	<header class="-p-lg">
		<h1 class="super">This is my h1 super</h1>
		<p class="lede --lg">
			The is is my lede text into the page Lorem ipsum dolor sit amet consectetur, adipisicing elit.
		</p>
	</header>
</div>

<article class="container -p-lg">
	<header>
		<h1>This is my H1 header inside an article</h1>
		<p class="lede">
			The is is my lede text into the article Lorem ipsum dolor sit amet consectetur, adipisicing
			elit.
		</p>
	</header>
	<figure class="-p-lg">
		<img
			src="https://content.socketcms.com/images/600/so422g693714qzm/beauty_beast_crane_800_600x322_pdny9fv3sm.jpg"
			alt="beauty"
		/>
		<figcaption>Beauty and the Beast</figcaption>
	</figure>

	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, iste molestias magni repudiandae
		natus, explicabo provident fuga officiis nesciunt enim quas nostrum ipsum reprehenderit
		recusandae totam minus! Quo, expedita iure!
	</p>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, iste molestias magni repudiandae
		natus, explicabo provident fuga officiis nesciunt enim quas nostrum ipsum reprehenderit
		recusandae totam minus! Quo, expedita iure!
	</p>
	<h2>This is h2</h2>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, iste molestias magni repudiandae
		natus, explicabo provident fuga officiis nesciunt enim quas nostrum ipsum reprehenderit
		recusandae totam minus! Quo, expedita iure!
	</p>

	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, iste molestias magni repudiandae
		natus, explicabo provident fuga officiis nesciunt enim quas nostrum ipsum reprehenderit
		recusandae totam minus! Quo, expedita iure!
	</p>

	<h3>Section</h3>

	<section class="-p bg-light">
		<header class="-m -p-b">
			<h3 class="--brd-none">This is h3 inside a section</h3>
		</header>
		<p class="lede">this section is modified</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, iste molestias magni repudiandae
			natus, explicabo provident fuga officiis nesciunt enim quas nostrum ipsum reprehenderit
			recusandae totam minus! Quo, expedita iure!
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, iste molestias magni repudiandae
			natus, explicabo provident fuga officiis nesciunt enim quas nostrum ipsum reprehenderit
			recusandae totam minus! Quo, expedita iure!
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, iste molestias magni repudiandae
			natus, explicabo provident fuga officiis nesciunt enim quas nostrum ipsum reprehenderit
			recusandae totam minus! Quo, expedita iure!
		</p>
	</section>
	<h3>Aside</h3>
	<aside class=" bg-light">
		<h4>Aside with h4</h4>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat accusantium laborum,
			perferendis, commodi laboriosam vitae ex incidunt iusto libero enim laudantium fugit.
			Consequatur doloribus voluptas, aliquid animi fugit eius expedita.
		</p>
	</aside>

	<h3>Buttons</h3>
	<button class="btn">Button</button>
	<button class="btn bg-danger">Delete</button>
	<button class="btn bg-success">Go Ahead</button>
	<button class="btn bg-warning">Take Care</button>
	<button class="btn -ghost">Ghost</button>
	<a href="/" class="btn">Link btn</a>
	<button class="btn --full">Full Button</button>
	<button class="btn --btn-small -m-y -p">Small</button>

	<h3>Navs and Lists</h3>
	<ul>
		<li>List item</li>
		<li>List Item</li>
		<li>List Item</li>
	</ul>
	<ol>
		<li>List item</li>
		<li>List Item</li>
		<li>List Item</li>
	</ol>
	<nav class="container bg-dark -txt-white -p -m-y">
		<a href="/"><Home /></a>
		<a href="/">
			<IconImage />
		</a>
		<div class="center">Navbar</div>
	</nav>
	<nav class="-vertical bg-dark -m-y -p">
		<header>
			<h3 class="-txt-white">Verticle Nav</h3>
		</header>
		<ul class="-txt-white -p">
			<li><a href="/">List Item</a></li>
			<li><a href="/">List Item</a></li>
		</ul>
	</nav>

	<h4>Breadcrumb</h4>

	<nav aria-label="Breadcrumb" class="container">
		<ul class="breadcrumb">
			<li><a href="/">Home</a></li>
			<li><a href="/category">Category</a></li>
			<li><a href="/category/sub-category">Sub-category</a></li>
			<li aria-current="page">Current Page</li>
		</ul>
	</nav>

	<h3 class="-m-b">Forms</h3>

	<form class="form -p">
		<fieldset class="-p">
			<input class="input -p -m-b" placeholder="input" />
			<input class="input -p -m-b" placeholder="input" />
			<input class="input -p -m-b" placeholder="input" />
		</fieldset>
	</form>
	<button class="btn full -m-y -p">Button</button>

	<div class="radio-group -p">
		<label class="radio-option">
			<input type="radio" name="option" value="1" />
			<span class="custom-radio"></span>
			<span class="label-text">Option 1</span>
		</label>
		<label class="radio-option">
			<input type="radio" name="option" value="2" />
			<span class="custom-radio"></span>
			<span class="label-text">Option 2</span>
		</label>
		<label class="radio-option">
			<input type="radio" name="option" value="3" />
			<span class="custom-radio"></span>
			<span class="label-text">Option 3</span>
		</label>
	</div>

	<div class="switch-container -p">
		<label class="switch">
			<input type="checkbox" />
			<span class="slider"></span>
			<span class="label-text">Enable Notifications</span>
		</label>
	</div>

	Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae voluptatem hic illo nemo id
	atque alias voluptatibus nulla voluptates, animi libero veritatis suscipit quibusdam ullam fugit
	quis debitis sint doloremque?
</article>
<article>
	<header><h2>Components</h2></header>

	<p class="lede --txt-left">components are imported and use dummy data</p>
	<h3 class="--brd-none">Card</h3>
	<PostCard {cardData} />
</article>

<style>
	.radio-group {
		display: flex;
		gap: 1.5rem;
	}

	/* Container */
	.switch-container {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	/* Switch Label */
	.switch {
		display: inline-flex;
		align-items: center;
		cursor: pointer;
		font-size: 1rem;
		color: #444;
		gap: 1rem;
		transition: color 0.3s ease;
	}

	.switch:hover {
		color: #007bff;
	}

	/* Hide Default Checkbox */
	.switch input[type='checkbox'] {
		display: none;
	}

	/* Slider */
	.slider {
		width: 2.5rem;
		height: 1.4rem;
		background-color: #ccc;
		border-radius: 1rem;
		position: relative;
		transition: background-color 0.3s ease;
		box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
	}

	/* Slider Handle */
	.slider::before {
		content: '';
		position: absolute;
		width: 1rem;
		height: 1rem;
		background-color: #fff;
		border-radius: 50%;
		top: 50%;
		left: 0.3rem;
		transform: translate(0, -50%);
		transition:
			left 0.3s ease,
			background-color 0.3s ease;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	/* Checked State */
	.switch input[type='checkbox']:checked + .slider {
		background-color: #007bff;
	}

	.switch input[type='checkbox']:checked + .slider::before {
		left: 1.3rem;
		background-color: #fff;
	}

	/* Focus State */
	.switch input[type='checkbox']:focus + .slider {
		box-shadow: 0 0 4px 2px rgba(0, 123, 255, 0.5);
	}

	/* Label Text */
	.label-text {
		font-size: 1rem;
		font-weight: 500;
		transition: color 0.3s ease;
	}

	/* Custom Radio Styling */
</style>
