defmodule IeltsWeb.ChooseTestTypeLiveTest do
  use IeltsWeb.ConnCase, async: true

  import Phoenix.LiveViewTest

  describe "choose test type screen" do
    test "renders the test type options with continue disabled", %{conn: conn} do
      {:ok, view, _html} = live(conn, ~p"/test/choose-type")

      assert has_element?(view, "#choose-test-type-screen")
      assert has_element?(view, "#academic-test-type-card")
      assert has_element?(view, "#general-test-type-card")
      assert has_element?(view, "#continue-test-type-button[disabled]")
    end

    test "selects academic and navigates with the selected type", %{conn: conn} do
      {:ok, view, _html} = live(conn, ~p"/test/choose-type")

      view
      |> element("#academic-test-type-card")
      |> render_click()

      assert has_element?(view, "#academic-test-type-card[aria-pressed]")
      refute has_element?(view, "#continue-test-type-button[disabled]")

      view
      |> element("#continue-test-type-button")
      |> render_click()

      assert_redirect(view, "/test/practice-mode?type=academic")
    end

    test "selects general training and navigates with the selected type", %{conn: conn} do
      {:ok, view, _html} = live(conn, ~p"/test/choose-type")

      view
      |> element("#general-test-type-card")
      |> render_click()

      assert has_element?(view, "#general-test-type-card[aria-pressed]")

      view
      |> element("#continue-test-type-button")
      |> render_click()

      assert_redirect(view, "/test/practice-mode?type=general")
    end
  end
end
