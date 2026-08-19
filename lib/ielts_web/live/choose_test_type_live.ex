defmodule IeltsWeb.ChooseTestTypeLive do
  @moduledoc """
  First screen in the IELTS test flow.
  """
  use IeltsWeb, :live_view

  @impl true
  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> assign(:page_title, "Choose Test Type")
     |> assign(:selected_type, nil)}
  end

  @impl true
  def handle_event("select_type", %{"type" => type}, socket)
      when type in ["academic", "general"] do
    {:noreply, assign(socket, :selected_type, String.to_existing_atom(type))}
  end

  def handle_event("continue", _params, %{assigns: %{selected_type: nil}} = socket) do
    {:noreply, socket}
  end

  def handle_event("continue", _params, socket) do
    {:noreply,
     push_navigate(socket, to: "/test/practice-mode?type=#{socket.assigns.selected_type}")}
  end

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash} active_tab={:home}>
      <section
        id="choose-test-type-screen"
        class="flex min-h-[calc(100dvh-8rem)] items-center justify-center bg-[linear-gradient(135deg,#C8DFFF_0%,#DFEBFF_50%,#F2F6FF_100%)] px-4 py-10 sm:px-6 md:min-h-[calc(100dvh-9rem)] md:py-14"
      >
        <div class="w-full max-w-4xl">
          <div class="mx-auto max-w-2xl text-center">
            <h1 class="text-3xl font-bold tracking-normal text-[#3242A0] sm:text-4xl md:text-5xl">
              Choose Your Test Type
            </h1>
            <p class="mt-3 text-base font-medium text-slate-500 sm:text-lg">
              Select the type of IELTS test you want to practice
            </p>
          </div>

          <div
            id="test-type-options"
            class="mt-8 grid gap-4 md:mt-10 md:grid-cols-2 md:gap-6"
          >
            <button
              id="academic-test-type-card"
              type="button"
              phx-click="select_type"
              phx-value-type="academic"
              aria-pressed={@selected_type == :academic}
              class={[
                "group rounded-2xl bg-white p-6 text-start shadow-md outline-none transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#3242A0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#DFEBFF]",
                @selected_type == :academic &&
                  "scale-[1.02] shadow-lg ring-2 ring-[#3242A0]"
              ]}
            >
              <div class="flex size-14 items-center justify-center rounded-2xl bg-[#EAF1FF] text-[#3242A0] transition group-hover:bg-[#DFEBFF]">
                <.icon name="hero-academic-cap" class="h-10 w-10" />
              </div>
              <h2 class="mt-5 text-xl font-bold text-slate-950">Academic</h2>
              <p class="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                For university admission and professional registration
              </p>
            </button>

            <button
              id="general-test-type-card"
              type="button"
              phx-click="select_type"
              phx-value-type="general"
              aria-pressed={@selected_type == :general}
              class={[
                "group rounded-2xl bg-white p-6 text-start shadow-md outline-none transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#3242A0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#DFEBFF]",
                @selected_type == :general &&
                  "scale-[1.02] shadow-lg ring-2 ring-[#3242A0]"
              ]}
            >
              <div class="flex size-14 items-center justify-center rounded-2xl bg-[#EAF1FF] text-[#3242A0] transition group-hover:bg-[#DFEBFF]">
                <.icon name="hero-briefcase" class="h-10 w-10" />
              </div>
              <h2 class="mt-5 text-xl font-bold text-slate-950">General Training</h2>
              <p class="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                For work experience, training programs, and migration
              </p>
            </button>
          </div>

          <div class="mt-8 flex justify-center md:mt-10">
            <button
              id="continue-test-type-button"
              type="button"
              phx-click="continue"
              disabled={is_nil(@selected_type)}
              class="w-full rounded-full bg-[#3242A0] px-8 py-3 text-base font-bold text-white shadow-md shadow-[#3242A0]/20 transition hover:-translate-y-0.5 hover:bg-[#283684] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-[#3242A0] disabled:hover:shadow-md sm:w-auto"
            >
              Continue
            </button>
          </div>
        </div>
      </section>
    </Layouts.app>
    """
  end
end
