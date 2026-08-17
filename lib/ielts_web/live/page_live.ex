defmodule IeltsWeb.PageLive do
  @moduledoc """
  The one page behind every tab: the app shell with an empty page area.

  Each tab of the bottom bar is a route into this LiveView, so the shell is
  navigable while the screens themselves are still to be built.
  """
  use IeltsWeb, :live_view

  @titles %{
    home: "Home",
    activities: "Activities",
    payment: "Payment",
    progress: "Progress"
  }

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :page_title, @titles[socket.assigns.live_action])}
  end

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash} active_tab={@live_action} />
    """
  end
end
