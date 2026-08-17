defmodule IeltsWeb.ShellTest do
  use IeltsWeb.ConnCase, async: true

  import Phoenix.LiveViewTest

  defp tabs do
    [
      {~p"/", "Home"},
      {~p"/activities", "Activities"},
      {~p"/payment", "Payment"},
      {~p"/progress", "Progress"}
    ]
  end

  describe "the app shell" do
    test "every tab renders the navbar and the four footer tabs", %{conn: conn} do
      for {path, _label} <- tabs() do
        {:ok, view, _html} = live(conn, path)

        assert has_element?(view, ~s(header nav button[aria-label="Go back"]))
        assert has_element?(view, ~s(header nav button[aria-label="Account"]))

        for {tab_path, label} <- tabs() do
          assert has_element?(view, ~s(footer nav a[href="#{tab_path}"]), label),
                 "expected a #{label} tab on #{path}"
        end
      end
    end

    test "marks the current tab as active", %{conn: conn} do
      for {path, _label} <- tabs() do
        {:ok, view, _html} = live(conn, path)

        assert has_element?(view, ~s(footer nav a[href="#{path}"][aria-current="page"]))

        assert view |> element(~s(footer nav a[data-active="true"])) |> render() =~
                 ~s(href="#{path}")
      end
    end

    test "leaves the page area between the bars empty", %{conn: conn} do
      {:ok, view, _html} = live(conn, ~p"/")

      assert view |> element("#page") |> render() =~ ~r/<main[^>]*>\s*<\/main>/
    end
  end
end
