defmodule IeltsWeb.ChoosePracticeModeLiveTest do
  use IeltsWeb.ConnCase, async: true

  import Phoenix.LiveViewTest

  describe "choose practice mode screen" do
    test "renders the practice mode options with start disabled", %{conn: conn} do
      {:ok, view, _html} = live(conn, ~p"/test/practice-mode?type=academic")

      assert has_element?(view, "#choose-practice-mode-screen")
      assert has_element?(view, ~s(#back-to-test-type-button[href="/test/choose-type"]))
      assert has_element?(view, "#selected-test-type-badge")
      assert has_element?(view, "#full-mock-practice-mode-card")
      assert has_element?(view, "#skill-practice-mode-card")
      assert has_element?(view, "#start-practice-mode-button[disabled]")
    end

    test "shows the selected test type from the query params", %{conn: conn} do
      {:ok, view, _html} = live(conn, ~p"/test/practice-mode?type=general")

      assert view
             |> element("#selected-test-type-badge")
             |> render() =~ "General Training"
    end

    test "selects full mock and navigates to the test library", %{conn: conn} do
      {:ok, view, _html} = live(conn, ~p"/test/practice-mode?type=academic")

      view
      |> element("#full-mock-practice-mode-card")
      |> render_click()

      assert has_element?(view, "#full-mock-practice-mode-card[aria-pressed]")
      refute has_element?(view, "#start-practice-mode-button[disabled]")

      view
      |> element("#start-practice-mode-button")
      |> render_click()

      assert_redirect(view, "/test/library?type=academic")
    end

    test "selects skill practice and navigates to skill selection", %{conn: conn} do
      {:ok, view, _html} = live(conn, ~p"/test/practice-mode?type=general")

      view
      |> element("#skill-practice-mode-card")
      |> render_click()

      assert has_element?(view, "#skill-practice-mode-card[aria-pressed]")

      view
      |> element("#start-practice-mode-button")
      |> render_click()

      assert_redirect(view, "/practice/skills?type=general")
    end
  end
end
