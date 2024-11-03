<script>

	import { page } from "$app/stores";

</script>
<div class="navbar">
	<div class="flex-1"></div>
	<div class="flex-none gap-2">
		<div class="dropdown dropdown-end">
			<!-- <div  class="avatar btn btn-circle btn-ghost">
				<div class="w-10 rounded-full">
					<img
						alt="Tailwind CSS Navbar component"
						src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
					/>
				</div>
			</div> -->
            <div tabindex="0" role="button" class="avatar placeholder">
                <div class="bg-neutral text-neutral-content w-10 rounded-full">
                  <span class="text-xl">{$page.data.user.username[0]}</span>
                </div>
              </div>
			<ul class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
				<li><a href="/">hello</a></li>
				<li><a href="/">Settings</a></li>
			</ul>
		</div>
	</div>
</div>
