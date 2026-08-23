defmodule IeltsWeb.MockLibraryLiveTest do
  use IeltsWeb.ConnCase, async: true

  import Phoenix.LiveViewTest

  describe "mock test library guest screen" do
    test "renders version 1 as the free library with locked newer versions", %{conn: conn} do
      {:ok, view, _html} = live(conn, ~p"/test/library")

      assert has_element?(view, "#mock-library-screen")
      assert has_element?(view, ~s(#back-to-practice-mode-button[href="/test/practice-mode"]))
      assert has_element?(view, "#mock-library-plan-badge")
      assert has_element?(view, "#version-v1-button[aria-pressed]")
      assert has_element?(view, "#version-v5-button")
      assert has_element?(view, "#version-v5-button .hero-lock-closed")
      assert has_element?(view, "#test-v1-mock1")
      assert has_element?(view, "#start-v1-mock1-button")
      assert has_element?(view, "#test-v1-mock2")
      assert has_element?(view, "#locked-v1-mock2-overlay")
      assert has_element?(view, "#premium-v1-mock2-label")
      assert has_element?(view, ~s(#upgrade-mock-library-button[href="/payment"]))
    end

    test "clicking a locked version keeps guests on version 1 and shows upgrade flash", %{
      conn: conn
    } do
      {:ok, view, _html} = live(conn, ~p"/test/library")

      view
      |> element("#version-v5-button")
      |> render_click()

      assert has_element?(view, "#version-v1-button[aria-pressed]")
      refute has_element?(view, "#test-v5-mock1")
      assert has_element?(view, "#flash-info")

      assert view
             |> element("#flash-info")
             |> render() =~ "Upgrade to Premium to access this version"
    end

    test "starting the free guest mock test shows the starting flash", %{conn: conn} do
      {:ok, view, _html} = live(conn, ~p"/test/library")

      view
      |> element("#start-v1-mock1-button")
      |> render_click()

      assert has_element?(view, "#flash-info")

      assert view
             |> element("#flash-info")
             |> render() =~ "Starting test..."
    end
  end
end
