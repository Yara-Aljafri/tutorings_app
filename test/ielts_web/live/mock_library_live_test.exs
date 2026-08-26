defmodule IeltsWeb.MockLibraryLiveTest do
  use IeltsWeb.ConnCase, async: true

  import Phoenix.LiveViewTest

  describe "mock test library guest screen" do
    test "renders version 1 as the free library with locked newer versions", %{conn: conn} do
      {:ok, view, _html} = live(conn, ~p"/test/library")

      assert has_element?(view, "#mock-library-screen")
      assert has_element?(view, ~s(#back-to-practice-mode-button[href="/test/practice-mode"]))
      assert has_element?(view, ~s(#mock-library-user-toggle[href="/test/library?user=premium"]))
      assert has_element?(view, "#mock-library-plan-badge")
      assert has_element?(view, "#mock-library-versions button:first-child#version-v1-button")
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

  describe "mock test library premium screen" do
    test "renders version 1 by default as the unlocked premium library", %{conn: conn} do
      {:ok, view, _html} = live(conn, ~p"/test/library?user=premium")

      assert has_element?(view, ~s(#mock-library-user-toggle[href="/test/library"]))
      assert has_element?(view, "#mock-library-plan-badge .hero-star")
      assert has_element?(view, "#mock-library-versions button:first-child#version-v1-button")
      assert has_element?(view, "#version-v1-button[aria-pressed]")
      refute has_element?(view, "#version-v5-button .hero-lock-closed")

      view
      |> element("#version-v5-button")
      |> render_click()

      assert has_element?(view, "#test-v5-mock1")
      assert has_element?(view, "#start-v5-mock1-button")
      assert has_element?(view, "#status-v5-mock1-pill")
      assert has_element?(view, "#score-v5-mock1")
      assert has_element?(view, "#status-v5-mock2-pill")
      assert has_element?(view, "#progress-v5-mock2")
      refute has_element?(view, "[id^='locked-']")
      refute has_element?(view, "#upgrade-mock-library-button")
    end

    test "premium users can open older versions without lock UI", %{conn: conn} do
      {:ok, view, _html} = live(conn, ~p"/test/library?user=premium")

      view
      |> element("#version-v3-button")
      |> render_click()

      assert has_element?(view, "#version-v3-button[aria-pressed]")
      assert has_element?(view, "#test-v3-mock1")
      assert has_element?(view, "#start-v3-mock1-button")
      assert has_element?(view, "#score-v3-mock1")
      refute has_element?(view, "#version-v3-button .hero-lock-closed")
    end
  end
end
