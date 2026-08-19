defmodule IeltsWeb.ChoosePracticeModeLive do
  @moduledoc """
  Second screen in the IELTS test flow.
  """
  use IeltsWeb, :live_view

  @impl true
  def mount(params, _session, socket) do
    test_type = Map.get(params, "type")

    {:ok,
     socket
     |> assign(:page_title, "Choose Practice Mode")
     |> assign(:test_type, test_type)
     |> assign(:selected_mode, nil)}
  end

  @impl true
  def handle_event("select_mode", %{"mode" => "full_mock"}, socket) do
    {:noreply, assign(socket, :selected_mode, :full_mock)}
  end

  def handle_event("select_mode", %{"mode" => "skill_practice"}, socket) do
    {:noreply, assign(socket, :selected_mode, :skill_practice)}
  end

  def handle_event("start", _params, %{assigns: %{selected_mode: nil}} = socket) do
    {:noreply, socket}
  end

  def handle_event("start", _params, %{assigns: %{selected_mode: :full_mock}} = socket) do
    {:noreply, push_navigate(socket, to: "/test/library?type=#{socket.assigns.test_type}")}
  end

  def handle_event("start", _params, %{assigns: %{selected_mode: :skill_practice}} = socket) do
    {:noreply, push_navigate(socket, to: "/practice/skills?type=#{socket.assigns.test_type}")}
  end

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash} active_tab={:home}>
      <section
        id="choose-practice-mode-screen"
        class="flex min-h-[calc(100dvh-8rem)] items-start justify-center bg-[linear-gradient(135deg,#C8DFFF_0%,#DFEBFF_50%,#F2F6FF_100%)] px-4 py-2 sm:px-6 md:min-h-[calc(100dvh-9rem)] md:py-4"
      >
        <div class="w-full max-w-4xl">
          <div class="mt-2 mb-1 flex items-center justify-between gap-3">
            <.link
              id="back-to-test-type-button"
              navigate={~p"/test/choose-type"}
              aria-label="Back to choose test type"
              class="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-[#3242A0] shadow-md outline-none transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#3242A0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#DFEBFF] sm:size-9"
            >
              <.icon name="hero-arrow-left" class="size-4 sm:size-5" />
            </.link>

            <span
              id="selected-test-type-badge"
              class="rounded-full bg-[#1F2A5A] px-3 py-1 text-xs font-bold text-white shadow-sm"
            >
              {test_type_label(@test_type)}
            </span>
          </div>

          <div class="mx-auto max-w-2xl text-center">
            <h1 class="text-3xl font-bold tracking-normal text-[#3242A0] sm:text-4xl md:text-5xl">
              Choose Practice Mode
            </h1>
            <p class="mt-3 text-base font-medium text-slate-500 sm:text-lg">
              How would you like to practice?
            </p>
          </div>

          <div
            id="practice-mode-options"
            class="mt-8 grid gap-3 md:mt-10 md:grid-cols-2 md:gap-6"
          >
            <button
              id="full-mock-practice-mode-card"
              type="button"
              phx-click="select_mode"
              phx-value-mode="full_mock"
              aria-pressed={@selected_mode == :full_mock}
              class={[
                "group rounded-2xl bg-white p-6 text-start shadow-md outline-none transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#3242A0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#DFEBFF]",
                @selected_mode == :full_mock &&
                  "scale-[1.02] shadow-lg ring-2 ring-[#3242A0]"
              ]}
            >
              <div class="flex size-14 items-center justify-center rounded-2xl bg-[#EAF1FF] text-[#3242A0] transition group-hover:bg-[#DFEBFF]">
                <.icon name="hero-clock" class="h-10 w-10" />
              </div>
              <h2 class="mt-5 text-xl font-bold text-slate-950">Full Mock Test</h2>
              <p class="mt-2 text-xs leading-5 text-slate-500">
                Complete timed test with all 4 sections
              </p>
              <p class="mt-4 text-xs font-semibold text-slate-700">
                Listening · Reading · Writing · Speaking
              </p>
              <span class="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-500">
                ~2h 45min
              </span>
            </button>

            <button
              id="skill-practice-mode-card"
              type="button"
              phx-click="select_mode"
              phx-value-mode="skill_practice"
              aria-pressed={@selected_mode == :skill_practice}
              class={[
                "group rounded-2xl bg-white p-6 text-start shadow-md outline-none transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#3242A0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#DFEBFF]",
                @selected_mode == :skill_practice &&
                  "scale-[1.02] shadow-lg ring-2 ring-[#3242A0]"
              ]}
            >
              <div class="flex size-14 items-center justify-center rounded-2xl bg-[#EAF1FF] text-[#3242A0] transition group-hover:bg-[#DFEBFF]">
                <.icon name="hero-puzzle-piece" class="h-10 w-10" />
              </div>
              <h2 class="mt-5 text-xl font-bold text-slate-950">Skill Practice</h2>
              <p class="mt-2 text-xs leading-5 text-slate-500">
                Practice individual skills at your own pace
              </p>
              <p class="mt-4 text-xs font-semibold text-slate-700">
                Choose any skill to focus on
              </p>
              <span class="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-500">
                Flexible timing
              </span>
            </button>
          </div>

          <div class="mt-8 flex justify-center md:mt-10">
            <button
              id="start-practice-mode-button"
              type="button"
              phx-click="start"
              disabled={is_nil(@selected_mode)}
              class="w-full rounded-full bg-[#3242A0] px-8 py-3 text-base font-bold text-white shadow-md shadow-[#3242A0]/20 transition hover:-translate-y-0.5 hover:bg-[#283684] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-[#3242A0] disabled:hover:shadow-md sm:w-auto"
            >
              Start
            </button>
          </div>
        </div>
      </section>
    </Layouts.app>
    """
  end

  defp test_type_label("academic"), do: "Academic"
  defp test_type_label("general"), do: "General Training"
  defp test_type_label(_test_type), do: "IELTS"
end
