defmodule IeltsWeb.MockLibraryLive do
  @moduledoc """
  Mock test library organized by book versions.
  """
  use IeltsWeb, :live_view

  alias Ielts.MockTests

  @impl true
  def mount(params, _session, socket) do
    user_type = user_type(params)
    selected_version = initial_version(user_type)

    {:ok,
     socket
     |> stream_configure()
     |> assign(:page_title, "Mock Test Library")
     |> assign(:user_type, user_type)
     |> assign(:selected_version, selected_version)
     |> stream(:versions, version_tabs())
     |> stream(:tests, MockTests.list_tests(selected_version))}
  end

  @impl true
  def handle_event("select_version", %{"version" => version}, socket) do
    version_key = version_key(version)

    cond do
      is_nil(version_key) ->
        {:noreply, socket}

      can_access_version?(socket.assigns.user_type, version_key) ->
        {:noreply, select_version(socket, version_key)}

      true ->
        {:noreply, put_flash(socket, :info, "Upgrade to Premium to access this version")}
    end
  end

  def handle_event("start_test", %{"test-id" => test_id}, socket) do
    test =
      socket.assigns.selected_version
      |> MockTests.list_tests()
      |> Enum.find(&(&1.id == test_id))

    if test && can_access_test?(socket.assigns.user_type, test) do
      {:noreply, put_flash(socket, :info, "Starting test...")}
    else
      {:noreply, put_flash(socket, :info, "Upgrade to Premium to access this test")}
    end
  end

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash} active_tab={:home}>
      <section
        id="mock-library-screen"
        class="min-h-[calc(100dvh-8rem)] bg-[linear-gradient(135deg,#C8DFFF_0%,#DFEBFF_50%,#F2F6FF_100%)] px-4 py-3 sm:px-6 md:min-h-[calc(100dvh-9rem)] md:py-5"
      >
        <div class="mx-auto w-full max-w-5xl">
          <div class="mb-4 flex items-center justify-between gap-3">
            <.link
              id="back-to-practice-mode-button"
              navigate={~p"/test/practice-mode"}
              aria-label="Back to practice mode"
              class="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-[#3242A0] shadow-md outline-none transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#3242A0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#DFEBFF] sm:size-9"
            >
              <.icon name="hero-arrow-left" class="size-4 sm:size-5" />
            </.link>

            <.link
              id="mock-library-user-toggle"
              navigate={
                if(@user_type == :premium,
                  do: ~p"/test/library",
                  else: ~p"/test/library?user=premium"
                )
              }
              aria-label={
                if(@user_type == :premium, do: "Switch to guest view", else: "Switch to premium view")
              }
              class="inline-flex items-center rounded-full bg-white/70 p-1 text-xs font-bold shadow-sm backdrop-blur"
            >
              <span class={[
                "rounded-full px-3 py-1.5",
                @user_type == :guest && "bg-[#3242A0] text-white shadow-sm",
                @user_type == :premium && "text-slate-500"
              ]}>Guest</span>
              <span class={[
                "rounded-full px-3 py-1.5",
                @user_type == :premium && "bg-[#3242A0] text-white shadow-sm",
                @user_type == :guest && "text-slate-500"
              ]}>Premium</span>
            </.link>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <h1 class="text-3xl font-bold tracking-normal text-[#3242A0] sm:text-4xl">
              Mock Test Library
            </h1>
            <span
              id="mock-library-plan-badge"
              class={[
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-sm",
                @user_type == :premium && "bg-[#F59E0B] text-white",
                @user_type == :guest && "border border-slate-300 bg-white/60 text-slate-500"
              ]}
            >
              <.icon :if={@user_type == :premium} name="hero-star" class="size-3.5" />
              {plan_label(@user_type)}
            </span>
          </div>

          <div class="mt-6 grid gap-4 lg:grid-cols-[15rem_1fr]">
            <nav
              id="mock-library-versions"
              phx-update="stream"
              aria-label="Mock test versions"
              class="flex gap-2 overflow-x-auto rounded-2xl bg-white/70 p-2 shadow-sm backdrop-blur lg:flex-col lg:overflow-visible"
            >
              <button
                :for={{id, version} <- @streams.versions}
                id={"#{id}-button"}
                type="button"
                phx-click="select_version"
                phx-value-version={version.key}
                aria-pressed={@selected_version == version.key}
                class={[
                  "group relative flex min-w-32 items-center justify-between gap-2 rounded-xl px-4 py-3 text-sm font-bold outline-none transition duration-200 ease-out focus-visible:ring-2 focus-visible:ring-[#3242A0] focus-visible:ring-offset-2 focus-visible:ring-offset-white lg:w-full",
                  @selected_version == version.key &&
                    "bg-[#EAF1FF] text-[#3242A0] shadow-sm",
                  @selected_version != version.key && version_locked?(@user_type, version.key) &&
                    "text-slate-400 opacity-50 hover:bg-slate-50",
                  @selected_version != version.key && !version_locked?(@user_type, version.key) &&
                    "text-slate-600 hover:bg-white hover:text-[#3242A0]"
                ]}
              >
                <span class="flex items-center gap-2">
                  <span
                    :if={@selected_version == version.key}
                    class="hidden h-5 w-1 rounded-full bg-[#3242A0] lg:block"
                  ></span>
                  {version.label}
                </span>
                <.icon
                  :if={version_locked?(@user_type, version.key)}
                  name="hero-lock-closed"
                  class="h-4 w-4"
                />
              </button>
            </nav>

            <div
              id="mock-library-tests"
              phx-update="stream"
              class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
            >
              <article
                :for={{id, test} <- @streams.tests}
                id={id}
                class={[
                  "relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm transition duration-200 ease-out",
                  can_access_test?(@user_type, test) &&
                    "hover:-translate-y-0.5 hover:shadow-md",
                  !can_access_test?(@user_type, test) && "opacity-40"
                ]}
              >
                <div
                  :if={!can_access_test?(@user_type, test)}
                  id={"locked-#{test.id}-overlay"}
                  class="pointer-events-none absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-slate-950/10 text-slate-700"
                >
                  <.icon name="hero-lock-closed" class="h-5 w-5" />
                </div>

                <p class="text-xs font-bold uppercase tracking-normal text-slate-400">
                  {test.version_label}
                </p>
                <h2 class="mt-2 text-lg font-bold text-slate-950">{test.title}</h2>

                <div :if={@user_type == :premium} class="mt-3 flex items-center justify-between gap-3">
                  <span
                    id={"status-#{test.id}-pill"}
                    class={[
                      "rounded-full px-2.5 py-1 text-xs font-bold",
                      status_pill_class(test.id)
                    ]}
                  >
                    {status_label(test.id)}
                  </span>
                  <span
                    :if={test_status(test.id).status == :completed}
                    id={"score-#{test.id}"}
                    class="text-sm font-bold text-emerald-600"
                  >
                    Band {score_label(test.id)}
                  </span>
                </div>

                <div
                  :if={@user_type == :premium && test_status(test.id).status == :in_progress}
                  id={"progress-#{test.id}"}
                  class="mt-3"
                  role="progressbar"
                  aria-label={"#{test.title} progress"}
                  aria-valuenow={test_status(test.id).progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div class="h-1.5 overflow-hidden rounded-full bg-blue-100">
                    <div
                      class="h-full rounded-full bg-blue-500 transition-[width] duration-500"
                      style={"width: #{test_status(test.id).progress}%"}
                    >
                    </div>
                  </div>
                  <p class="mt-1 text-right text-xs font-semibold text-blue-600">
                    {test_status(test.id).progress}% complete
                  </p>
                </div>

                <div class="mt-4 flex flex-wrap gap-3">
                  <span
                    :for={section <- test.sections}
                    class="flex items-center gap-1.5 text-xs font-semibold text-slate-600"
                  >
                    <span
                      class="size-2.5 rounded-full"
                      style={"background-color: #{section_color(section)}"}
                    ></span>
                    {section}
                  </span>
                </div>

                <div class="mt-5 flex items-center justify-between gap-3">
                  <span class="text-sm font-semibold text-slate-500">
                    {duration_label(test.duration_minutes)}
                  </span>

                  <button
                    :if={can_access_test?(@user_type, test)}
                    id={"start-#{test.id}-button"}
                    type="button"
                    phx-click="start_test"
                    phx-value-test-id={test.id}
                    class="rounded-full bg-[#3242A0] px-4 py-2 text-sm font-bold text-white shadow-md shadow-[#3242A0]/20 transition hover:-translate-y-0.5 hover:bg-[#283684] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3242A0] focus-visible:ring-offset-2"
                  >
                    Start Test
                  </button>

                  <span
                    :if={!can_access_test?(@user_type, test)}
                    id={"premium-#{test.id}-label"}
                    class="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-500"
                  >
                    Premium
                  </span>
                </div>
              </article>
            </div>
          </div>

          <div
            :if={@user_type == :guest}
            class="mt-5 rounded-2xl bg-[linear-gradient(to_right,#7f60ea,#647fe8,#34a6dd,#39acad)] p-5 text-white shadow-md sm:flex sm:items-center sm:justify-between sm:gap-4"
          >
            <p class="text-lg font-bold">Unlock all versions and tests</p>
            <.link
              id="upgrade-mock-library-button"
              navigate={~p"/payment"}
              class="mt-4 inline-flex rounded-full border border-white/80 px-5 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-[#3242A0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:mt-0"
            >
              Upgrade to Premium
            </.link>
          </div>
        </div>
      </section>
    </Layouts.app>
    """
  end

  defp stream_configure(socket) do
    socket
    |> stream_configure(:versions, dom_id: &"version-#{&1.key}")
    |> stream_configure(:tests, dom_id: &"test-#{&1.id}")
  end

  defp select_version(socket, version_key) do
    socket
    |> assign(:selected_version, version_key)
    |> stream(:versions, version_tabs(), reset: true)
    |> stream(:tests, MockTests.list_tests(version_key), reset: true)
  end

  defp version_tabs, do: Enum.reverse(MockTests.list_versions())

  defp user_type(%{"user" => "premium"}), do: :premium
  defp user_type(_params), do: :guest

  defp initial_version(_user_type), do: MockTests.free_version()

  defp version_key("v1"), do: :v1
  defp version_key("v2"), do: :v2
  defp version_key("v3"), do: :v3
  defp version_key("v4"), do: :v4
  defp version_key("v5"), do: :v5
  defp version_key(_version), do: nil

  defp version_locked?(:guest, version_key), do: version_key != MockTests.free_version()
  defp version_locked?(_user_type, _version_key), do: false

  defp can_access_version?(:guest, version_key), do: version_key == MockTests.free_version()
  defp can_access_version?(_user_type, _version_key), do: true

  defp can_access_test?(:guest, test), do: test.is_free
  defp can_access_test?(_user_type, _test), do: true

  defp plan_label(:premium), do: "Premium"
  defp plan_label(_user_type), do: "Free Plan"

  defp test_status(test_id), do: MockTests.status_for(test_id)

  defp status_label(test_id) do
    case test_status(test_id).status do
      :completed -> "Completed"
      :in_progress -> "In Progress"
      :not_started -> "Not Started"
    end
  end

  defp status_pill_class(test_id) do
    case test_status(test_id).status do
      :completed -> "bg-emerald-100 text-emerald-700"
      :in_progress -> "bg-blue-100 text-blue-700"
      :not_started -> "bg-slate-100 text-slate-600"
    end
  end

  defp score_label(test_id) do
    test_id
    |> test_status()
    |> Map.fetch!(:score)
    |> :erlang.float_to_binary(decimals: 1)
  end

  defp duration_label(minutes) do
    hours = div(minutes, 60)
    remaining_minutes = rem(minutes, 60)

    "#{hours}h #{remaining_minutes}min"
  end

  defp section_color("Listening"), do: "#647FE8"
  defp section_color("Reading"), do: "#79C698"
  defp section_color("Writing"), do: "#35A7DF"
  defp section_color("Speaking"), do: "#8E81F2"
  defp section_color(_section), do: "#64748B"
end
